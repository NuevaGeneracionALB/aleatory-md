/* Copyright 2020-2023 Ethan Halsall
    
    This file is part of codec-parser.
    
    codec-parser is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    codec-parser is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>
*/

import { frameStore } from "../../globals.js";
import { BitReader, reverse } from "../../utilities.js";
import {
  data,
  codec,
  blocksize0,
  blocksize1,
  pageSequenceNumber,
  codecFrames,
  segments,
  vorbis,
  logError,
  parseOggPage,
  enable,
  getHeaderFromUint8Array,
} from "../../constants.js";

import Parser from "../Parser.js";
import VorbisFrame from "./VorbisFrame.js";
import VorbisHeader from "./VorbisHeader.js";

export default class VorbisParser extends Parser {
  constructor(codecParser, headerCache, onCodec) {
    super(codecParser, headerCache);
    this.Frame = VorbisFrame;

    onCodec(this[codec]);

    this._identificationHeader = null;
    this._setupComplete = false;

    this._mode = {
      count: 0,
    };
    this._prevBlockSize = 0;
    this._currBlockSize = 0;
  }

  get [codec]() {
    return vorbis;
  }

  [parseOggPage](oggPage) {
    oggPage[codecFrames] = [];

    for (const oggPageSegment of frameStore.get(oggPage)[segments]) {
      if (oggPageSegment[0] === 1) {
        // Identification header

        this._headerCache[enable]();
        this._identificationHeader = oggPage[data];
        this._setupComplete = false;
      } else if (oggPageSegment[0] === 3) {
        // comment header

        this._vorbisComments = oggPageSegment;
      } else if (oggPageSegment[0] === 5) {
        // setup header

        this._vorbisSetup = oggPageSegment;
        this._mode = this._parseSetupHeader(oggPageSegment);
        this._setupComplete = true;
      } else if (this._setupComplete) {
        const header = VorbisHeader[getHeaderFromUint8Array](
          this._identificationHeader,
          this._headerCache,
          this._vorbisComments,
          this._vorbisSetup
        );

        if (header) {
          oggPage[codecFrames].push(
            new VorbisFrame(
              oggPageSegment,
              header,
              this._getSamples(oggPageSegment, header)
            )
          );
        } else {
          this._codecParser[logError](
            "Failed to parse Ogg Vorbis Header",
            "Not a valid Ogg Vorbis file"
          );
        }
      }
    }

    return oggPage;
  }

  _getSamples(segment, header) {
    const byte = segment[0] >> 1;

    const blockFlag = this._mode[byte & this._mode.mask];

    // is this a large window
    if (blockFlag) {
      this._prevBlockSize =
        byte & this._mode.prevMask ? header[blocksize1] : header[blocksize0];
    }

    this._currBlockSize = blockFlag ? header[blocksize1] : header[blocksize0];

    const samplesValue = (this._prevBlockSize + this._currBlockSize) >> 2;
    this._prevBlockSize = this._currBlockSize;

    return samplesValue;
  }

  // https://gitlab.xiph.org/xiph/liboggz/-/blob/master/src/liboggz/oggz_auto.c
  // https://github.com/FFmpeg/FFmpeg/blob/master/libavcodec/vorbis_parser.c
  /*
   * This is the format of the mode data at the end of the packet for all
   * Vorbis Version 1 :
   *
   * [ 6:number_of_modes ]
   * [ 1:size | 16:window_type(0) | 16:transform_type(0) | 8:mapping ]
   * [ 1:size | 16:window_type(0) | 16:transform_type(0) | 8:mapping ]
   * [ 1:size | 16:window_type(0) | 16:transform_type(0) | 8:mapping ]
   * [ 1:framing(1) ]
   *
   * e.g.:
   *
   * MsB         LsB
   *              <-
   * 0 0 0 0 0 1 0 0
   * 0 0 1 0 0 0 0 0
   * 0 0 1 0 0 0 0 0
   * 0 0 1|0 0 0 0 0
   * 0 0 0 0|0|0 0 0
   * 0 0 0 0 0 0 0 0
   * 0 0 0 0|0 0 0 0
   * 0 0 0 0 0 0 0 0
   * 0 0 0 0|0 0 0 0
   * 0 0 0|1|0 0 0 0 |
   * 0 0 0 0 0 0 0 0 V
   * 0 0 0|0 0 0 0 0
   * 0 0 0 0 0 0 0 0
   * 0 0 1|0 0 0 0 0
   *
   * The simplest way to approach this is to start at the end
   * and read backwards to determine the mode configuration.
   *
   * liboggz and ffmpeg both use this method.
   */
  _parseSetupHeader(setup) {
    const bitReader = new BitReader(setup);
    const failedToParseVorbisStream = "Failed to read " + vorbis + " stream";
    const failedToParseVorbisModes = ", failed to parse " + vorbis + " modes";

    let mode = {
      count: 0,
    };

    // sync with the framing bit
    while ((bitReader.read(1) & 0x01) !== 1) {}

    let modeBits;
    // search in reverse to parse out the mode entries
    // limit mode count to 63 so previous block flag will be in first packet byte
    while (mode.count < 64 && bitReader.position > 0) {
      const mapping = reverse(bitReader.read(8));
      if (
        mapping in mode &&
        !(mode.count === 1 && mapping === 0) // allows for the possibility of only one mode
      ) {
        this._codecParser[logError](
          "received duplicate mode mapping" + failedToParseVorbisModes
        );
        throw new Error(failedToParseVorbisStream);
      }

      // 16 bits transform type, 16 bits window type, all values must be zero
      let i = 0;
      while (bitReader.read(8) === 0x00 && i++ < 3) {} // a non-zero value may indicate the end of the mode entries, or invalid data

      if (i === 4) {
        // transform type and window type were all zeros
        modeBits = bitReader.read(7); // modeBits may need to be used in the next iteration if this is the last mode entry
        mode[mapping] = modeBits & 0x01; // read and store mode -> block flag mapping
        bitReader.position += 6; // go back 6 bits so next iteration starts right after the block flag
        mode.count++;
      } else {
        // transform type and window type were not all zeros
        // check for mode count using previous iteration modeBits
        if (((reverse(modeBits) & 0b01111110) >> 1) + 1 !== mode.count) {
          this._codecParser[logError](
            "mode count did not match actual modes" + failedToParseVorbisModes
          );
          throw new Error(failedToParseVorbisStream);
        }

        break;
      }
    }

    // mode mask to read the mode from the first byte in the vorbis frame
    mode.mask = (1 << Math.log2(mode.count)) - 1;
    // previous window flag is the next bit after the mode mask
    mode.prevMask = (mode.mask | 0x1) + 1;

    return mode;
  }
}
