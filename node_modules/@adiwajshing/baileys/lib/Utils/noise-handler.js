"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeNoiseHandler = void 0;
const boom_1 = require("@hapi/boom");
const crypto_1 = require("crypto");
const WAProto_1 = require("../../WAProto");
const Defaults_1 = require("../Defaults");
const WABinary_1 = require("../WABinary");
const crypto_2 = require("./crypto");
const TAG_LENGTH = 128 >> 3;
const generateIV = (counter) => {
    const iv = new ArrayBuffer(12);
    new DataView(iv).setUint32(8, counter);
    return new Uint8Array(iv);
};
const makeNoiseHandler = ({ public: publicKey, private: privateKey }, logger) => {
    logger = logger.child({ class: 'ns' });
    const authenticate = (data) => {
        if (!isFinished) {
            hash = (0, crypto_2.sha256)(Buffer.concat([hash, data]));
        }
    };
    const encrypt = (plaintext) => {
        const cipher = (0, crypto_1.createCipheriv)('aes-256-gcm', encKey, generateIV(writeCounter), { authTagLength: TAG_LENGTH });
        cipher.setAAD(hash);
        const result = Buffer.concat([cipher.update(plaintext), cipher.final(), cipher.getAuthTag()]);
        writeCounter += 1;
        authenticate(result);
        return result;
    };
    const decrypt = (ciphertext) => {
        // before the handshake is finished, we use the same counter
        // after handshake, the counters are different
        const iv = generateIV(isFinished ? readCounter : writeCounter);
        const cipher = (0, crypto_1.createDecipheriv)('aes-256-gcm', decKey, iv);
        // decrypt additional adata
        const enc = ciphertext.slice(0, ciphertext.length - TAG_LENGTH);
        const tag = ciphertext.slice(ciphertext.length - TAG_LENGTH);
        // set additional data
        cipher.setAAD(hash);
        cipher.setAuthTag(tag);
        const result = Buffer.concat([cipher.update(enc), cipher.final()]);
        if (isFinished) {
            readCounter += 1;
        }
        else {
            writeCounter += 1;
        }
        authenticate(ciphertext);
        return result;
    };
    const localHKDF = (data) => {
        const key = (0, crypto_2.hkdf)(Buffer.from(data), 64, { salt, info: '' });
        return [key.slice(0, 32), key.slice(32)];
    };
    const mixIntoKey = (data) => {
        const [write, read] = localHKDF(data);
        salt = write;
        encKey = read;
        decKey = read;
        readCounter = 0;
        writeCounter = 0;
    };
    const finishInit = () => {
        const [write, read] = localHKDF(new Uint8Array(0));
        encKey = write;
        decKey = read;
        hash = Buffer.from([]);
        readCounter = 0;
        writeCounter = 0;
        isFinished = true;
    };
    const data = Buffer.from(Defaults_1.NOISE_MODE);
    let hash = Buffer.from(data.byteLength === 32 ? data : (0, crypto_2.sha256)(Buffer.from(data)));
    let salt = hash;
    let encKey = hash;
    let decKey = hash;
    let readCounter = 0;
    let writeCounter = 0;
    let isFinished = false;
    let sentIntro = false;
    let inBytes = Buffer.alloc(0);
    authenticate(Defaults_1.NOISE_WA_HEADER);
    authenticate(publicKey);
    return {
        encrypt,
        decrypt,
        authenticate,
        mixIntoKey,
        finishInit,
        processHandshake: ({ serverHello }, noiseKey) => {
            authenticate(serverHello.ephemeral);
            mixIntoKey(crypto_2.Curve.sharedKey(privateKey, serverHello.ephemeral));
            const decStaticContent = decrypt(serverHello.static);
            mixIntoKey(crypto_2.Curve.sharedKey(privateKey, decStaticContent));
            const certDecoded = decrypt(serverHello.payload);
            const { intermediate: certIntermediate } = WAProto_1.proto.CertChain.decode(certDecoded);
            const { issuerSerial } = WAProto_1.proto.Details.decode(certIntermediate.details);
            if (issuerSerial !== Defaults_1.WA_CERT_DETAILS.SERIAL) {
                throw new boom_1.Boom('certification match failed', { statusCode: 400 });
            }
            const keyEnc = encrypt(noiseKey.public);
            mixIntoKey(crypto_2.Curve.sharedKey(noiseKey.private, serverHello.ephemeral));
            return keyEnc;
        },
        encodeFrame: (data) => {
            if (isFinished) {
                data = encrypt(data);
            }
            const introSize = sentIntro ? 0 : Defaults_1.NOISE_WA_HEADER.length;
            const frame = Buffer.alloc(introSize + 3 + data.byteLength);
            if (!sentIntro) {
                frame.set(Defaults_1.NOISE_WA_HEADER);
                sentIntro = true;
            }
            frame.writeUInt8(data.byteLength >> 16, introSize);
            frame.writeUInt16BE(65535 & data.byteLength, introSize + 1);
            frame.set(data, introSize + 3);
            return frame;
        },
        decodeFrame: (newData, onFrame) => {
            var _a;
            // the binary protocol uses its own framing mechanism
            // on top of the WS frames
            // so we get this data and separate out the frames
            const getBytesSize = () => {
                if (inBytes.length >= 3) {
                    return (inBytes.readUInt8() << 16) | inBytes.readUInt16BE(1);
                }
            };
            inBytes = Buffer.concat([inBytes, newData]);
            logger.trace(`recv ${newData.length} bytes, total recv ${inBytes.length} bytes`);
            let size = getBytesSize();
            while (size && inBytes.length >= size + 3) {
                let frame = inBytes.slice(3, size + 3);
                inBytes = inBytes.slice(size + 3);
                if (isFinished) {
                    const result = decrypt(frame);
                    frame = (0, WABinary_1.decodeBinaryNode)(result);
                }
                logger.trace({ msg: (_a = frame === null || frame === void 0 ? void 0 : frame.attrs) === null || _a === void 0 ? void 0 : _a.id }, 'recv frame');
                onFrame(frame);
                size = getBytesSize();
            }
        }
    };
};
exports.makeNoiseHandler = makeNoiseHandler;
