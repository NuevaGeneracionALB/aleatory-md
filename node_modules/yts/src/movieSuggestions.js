// Using Axios for HTTP requests
const axios = require("axios");

/*
 * By default, the YTS API does not give a magnet URL a torrent.
 * This utility function will help generate them.
 */
const generateMagnetUrl = require("./utilities/generateMagnetUrl");

module.exports = async (baseUrl, params) => {
  // Request 4 related movies as suggestions based on a movie id
  const res = await axios.get(`${baseUrl}/movie_suggestions.json`, { params });

  // Loop through suggested movies
  const movies = res.data.data.movies.map((movie) => {
    // Loop through torrents in each movie
    const torrents = movie.torrents.map((torrent) => {
      // Return the original torrent, plus the added magnet URL
      return {
        ...torrent,
        magnet_url: generateMagnetUrl(movie.title_long, torrent),
      };
    });

    /*
     * Return the original movie, plus the new torrents array which
     * contains magnet URLs.
     */
    return {
      ...movie,
      torrents,
    };
  });

  /*
   * Return the original YTS API's data object, replacing movie array
   * with updated movie array which includes magnet URLs.
   */
  return {
    ...res.data.data,
    movies,
  };
};
