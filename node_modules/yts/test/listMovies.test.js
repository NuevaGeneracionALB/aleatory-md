const listMovies = require("../src/index").listMovies;

describe("lists movies", () => {
  test("without parameters", async () => {
    expect.assertions(1);

    const res = await listMovies();

    expect(res.movie_count).toBeGreaterThan(0);
  });

  test("with a limit", async () => {
    expect.assertions(1);

    const res = await listMovies({ limit: 5 });

    expect(res.movies.length).toBe(5);
  });

  test("with pagination", async () => {
    expect.assertions(2);

    const res1 = await listMovies({ limit: 1 });
    const res2 = await listMovies({ limit: 1, page: 2 });

    expect(res2.page_number).toBe(2);
    expect(res1.movies[0].id).not.toBe(res2.movies[0].id);
  });

  test("with quality filter", async () => {
    expect.assertions(1);

    const res = await listMovies({ quality: "720p" });
    
    const movies720p = res.movies.filter((movie) => {
      const torrents720p = movie.torrents.filter((torrent) => {
        return torrent.quality === "720p";
      });

      return torrents720p.length > 0;
    });

    expect(movies720p.length).toBe(20);
  });

  test("with rating filter", async () => {
    expect.assertions(1);
  
    const ratingMinimum = 8;
    const res = await listMovies({ minimum_rating: ratingMinimum });
    
    const moviesRating = res.movies.filter((movie) => {
      return movie.rating >= ratingMinimum;
    });

    expect(moviesRating.length).toBe(20);
  });

  describe("while searching", () => {
    test("for movie title", async () => {
      expect.assertions(1);

      const res = await listMovies({ query_term: "Avengers: Infinity War" });

      expect(res.movies[0].id).toBe(8462);
    });

    test("for IMDB movie code", async () => {
      expect.assertions(1);

      const res = await listMovies({ query_term: "tt4154756" });
      
      expect(res.movies[0].id).toBe(8462);
    });

    /*
     * Note: The YTS API documentation describes searching by actor name.
     * However, no results are returned by the API.
     */

    /*
     * Note: The YTS API documentation describes searching by actor IMDB code.
     * However, no results are returned by the API.
     */

    /*
     * Note: The YTS API documentation describes searching by director name.
     * However, no results are returned by the API.
     */

    /*
     * Note: The YTS API documentation describes searching by actor IMDB code.
     * However, no results are returned by the API.
     */
  });

  test("by genre", async () => {
    expect.assertions(1);
  
    const genre = "action";
    const res = await listMovies({ genre: genre });
      
    const moviesInGenre = res.movies.filter((movie) => {
      const matchingGenres = movie.genres.filter((g) => {
        return g.toLowerCase() === genre.toLowerCase();
      });

      return matchingGenres.length > 0;
    });

    expect(moviesInGenre.length).toBe(20);
  });

  describe("sorted", () => {
    test("by title", async () => {
      expect.assertions(1);
    
      const sortKey = "title";
      const res = await listMovies({ sort_by: sortKey });
      
      const moviesSorted = res.movies.sort((a, b) => {
        if (a[sortKey] < b[sortKey]) return 1;
        if (a[sortKey] > b[sortKey]) return -1;
        return 0;
      });

      expect(res.movies).toEqual(moviesSorted);
    });

    test("by year", async () => {
      expect.assertions(1);
    
      const sortKey = "year";
      const res = await listMovies({ sort_by: sortKey });
      
      const moviesSorted = res.movies.sort((a, b) => {
        if (a[sortKey] < b[sortKey]) return 1;
        if (a[sortKey] > b[sortKey]) return -1;
        return 0;
      });

      expect(res.movies).toEqual(moviesSorted);
    });

    test("by rating", async () => {
      expect.assertions(1);
    
      const sortKey = "rating";
      const res = await listMovies({ sort_by: sortKey });
      
      const moviesSorted = res.movies.sort((a, b) => {
        if (a[sortKey] < b[sortKey]) return 1;
        if (a[sortKey] > b[sortKey]) return -1;
        return 0;
      });

      expect(res.movies).toEqual(moviesSorted);
    });

    /*
     * Note: The YTS API documentation describes sorting by peers.
     * However, returned data is returned in default order (date_added desc) anyway.
     */

    /*
     * Note: The YTS API documentation describes sorting by seeds.
     * However, returned data is returned in default order (date_added desc) anyway.
     */

    /*
     * Note: The YTS API documentation describes sorting by download_count.
     * However, returned data doesn't include download count.
     * The only way to test would be making multiple secondary requests for movie details.
     */

    /*
     * Note: The YTS API documentation describes sorting by like_count.
     * However, returned data doesn't include like count.
     * The only way to test would be making multiple secondary requests for movie details.
     */

    test("by date added", async () => {
      expect.assertions(1);
    
      const sortKey = "date_added";
      const res = await listMovies({ sort_by: sortKey });
      
      const moviesSorted = res.movies.sort((a, b) => {
        if (a["date_uploaded_unix"] < b["date_uploaded_unix"]) return -1;
        if (a["date_uploaded_unix"] > b["date_uploaded_unix"]) return 1;
        return 0;
      });

      expect(res.movies).toEqual(moviesSorted);
    });

    test("by date added ascending", async () => {
      expect.assertions(1);
    
      const sortKey = "date_added";
      const res = await listMovies({ sort_by: sortKey, order_by: "asc" });
      
      const moviesSorted = res.movies.sort((a, b) => {
        if (a["date_uploaded_unix"] < b["date_uploaded_unix"]) return 1;
        if (a["date_uploaded_unix"] > b["date_uploaded_unix"]) return -1;
        return 0;
      });

      expect(res.movies).toEqual(moviesSorted);
    });
  });

  /*
   * Note: The YTS API documentation describes toggling on Rotten Tomatoes ratings
   * with the with_rt_ratings=true parameter.
   * However, it doesn't add any ratings even for the most popular movies.
   */
});
