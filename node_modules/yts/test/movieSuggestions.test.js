const movieSuggestions = require("../src/index").movieSuggestions;

const movie_id = 8462;

describe("gets movie suggestions", () => {
  test("by movide id", async () => {
    expect.assertions(1);

    const res = await movieSuggestions({ movie_id: movie_id });

    expect(res.movie_count).toBe(4);
  });
});
