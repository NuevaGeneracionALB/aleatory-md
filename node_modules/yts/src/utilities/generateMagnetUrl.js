/*
 * This list of trackers was updated 2021-01-14
 * It is the list found on all magnet URLs on https://yts.mx
 * Note that this is a different list than what the API docs recommend,
 * but using matching URLs to the actual site is probably better.
 */

const trackers = [
  "udp://tracker.opentrackr.org:1337/announce",
  "udp://tracker.leechers-paradise.org:6969/announce",
  "udp://9.rarbg.to:2710/announce",
  "udp://p4p.arenabg.ch:1337/announce",
  "udp://tracker.cyberia.is:6969/announce",
  "http://p4p.arenabg.com:1337/announce",
  "udp://tracker.internetwarriors.net:1337/announce",
];

// URL-encode each tracker's URL
const trackersEncoded = trackers.map(encodeURIComponent);

// Join tracker URLs together to be added to the magnet URL
const trackersJoined = trackersEncoded.join("&tr");

/*
 * Main function should be called with the movie title, and a torrent
 * object as provided by the YTS API. The quality and hash is needed from
 * the torrent object.
 *
 * This function generates magnet URLs in the same format that https://yts.mx
 * does.
 */
module.exports = (title, torrent) => {
  const name = encodeURIComponent(`${title} [${torrent.quality}] [YTS.MX]`);
  return `magnet:?xt=urn:btih:${torrent.hash}&dn=${name}&tr=${trackersJoined}`;
};
