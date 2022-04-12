// Using Axios for HTTP requests
const axios = require("axios");

/*
 * By default, the YTS API does not give a magnet URL a torrent.
 * This utility function will help generate them.
 */
const generateMagnetUrl = require("./utilities/generateMagnetUrl");

module.exports = async (baseUrl, params) => {
  // Request movie details for the movie id in params
  const res = await axios.get(`${baseUrl}/movie_details.json`, { params });
  const movie = res.data.data.movie;

  // Loop through torrents in the movie
  const torrents = movie.torrents.map((torrent) => {
    // Return the original torrent, plus the added magnet URL
    return {
      ...torrent,
      magnet_url: generateMagnetUrl(movie.title_long, torrent),
    };
  });

  /*
   * Return the YTS returned movie object, plus the new torrents array which
   * contains magnet URLs.
   */
  return {
    ...movie,
    torrents,
  };
};
