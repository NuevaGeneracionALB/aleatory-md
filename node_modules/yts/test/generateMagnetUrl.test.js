const generateMagnetUrl = require("../src/utilities/generateMagnetUrl");
const listMovies = require("../src/index").listMovies;
const movieDetails = require("../src/index").movieDetails;
const movieSuggestions = require("../src/index").movieSuggestions;

const movie_id = 8462;

test("generates a magnet URL", async () => {
  expect.assertions(1);

  const movie = await movieDetails({ movie_id: movie_id });
  const torrent = movie.torrents.find((torrent) => torrent.quality === "720p");
  const magnetUrl = generateMagnetUrl(movie.title_long, torrent);

  /*
   * Note: This test must change if trackers array is updated in
   * src/utilities/generateMagnetUrl.js
   */
  expect(magnetUrl).toBe("magnet:?xt=urn:btih:EA17E6BE92962A403AC1C638D2537DCF1E564D26&dn=Avengers%3A%20Infinity%20War%20(2018)%20%5B720p%5D%20%5BYTS.MX%5D&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&trudp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&trudp%3A%2F%2F9.rarbg.to%3A2710%2Fannounce&trudp%3A%2F%2Fp4p.arenabg.ch%3A1337%2Fannounce&trudp%3A%2F%2Ftracker.cyberia.is%3A6969%2Fannounce&trhttp%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&trudp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce");
});

test("integrates with listMovies", async () => {
  expect.assertions(1);

  const res = await listMovies();
  
  const moviesWithMagnets = res.movies.filter((movie) => {
    const torrentsWithMagnets = movie.torrents.filter((torrent) => {
      return torrent.magnet_url.slice(0, 7) === "magnet:";
    });

    return torrentsWithMagnets.length > 0;
  });

  expect(moviesWithMagnets.length).toBe(20);
});

test("integrates with movieDetails", async () => {
  expect.assertions(1);

  const movie = await movieDetails({ movie_id: movie_id });
  
  const torrentsWithMagnets = movie.torrents.filter((torrent) => {
    return torrent.magnet_url.slice(0, 7) === "magnet:";
  });

  expect(torrentsWithMagnets.length).toBeGreaterThan(0);
});

test("integrates with movieSuggestions", async () => {
  expect.assertions(1);

  const res = await movieSuggestions({ movie_id: movie_id });
  
  const moviesWithMagnets = res.movies.filter((movie) => {
    const torrentsWithMagnets = movie.torrents.filter((torrent) => {
      return torrent.magnet_url.slice(0, 7) === "magnet:";
    });

    return torrentsWithMagnets.length > 0;
  });

  expect(moviesWithMagnets.length).toBe(4);
});
