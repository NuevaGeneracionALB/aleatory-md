const movieDetails = require("../src/index").movieDetails;

const movie_id = 8462;

describe("gets movie details", () => {
  test("by movide id", async () => {
    expect.assertions(1);

    const res = await movieDetails({ movie_id: movie_id });

    expect(res.id).toBe(movie_id);
  });

  test("with added image URLs", async () => {
    expect.assertions(2);

    const res = await movieDetails({ movie_id: movie_id, with_images: true });

    expect(res.medium_screenshot_image1).toBeDefined();
    expect(res.large_screenshot_image1).toBeDefined();
  });

  test("with cast", async () => {
    expect.assertions(1);

    const res = await movieDetails({ movie_id: movie_id, with_cast: true });

    expect(res.cast).toBeDefined();
  });
});
