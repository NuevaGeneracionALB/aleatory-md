// Functions are in separate files. Require them.
const lm = require("./listMovies");
const md = require("./movieDetails");
const ms = require("./movieSuggestions");

// The base URL for the YTS API. As of 2021-01-14 via https://yts.mx/api
const baseUrl = "https://yts.mx/api/v2";

/*
 * Create a listMovies function that always uses the specified base URL
 * Can be called via listMovies(params) where params is an object following
 * the endpoint parameters at https://yts.mx/api#list_movies
 */
const listMovies = async (params) => lm(baseUrl, params);
const movieDetails = async (params) => md(baseUrl, params);
const movieSuggestions = async (params) => ms(baseUrl, params);

// Export the composed functions so they can be called like yts.listMovies() etc.
module.exports = {
  listMovies,
  movieDetails,
  movieSuggestions,
};
