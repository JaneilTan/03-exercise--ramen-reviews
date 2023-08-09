require("dotenv").config();
const pool = require("./db");
const ramenReviews = require("./data/json/ramen-reviews.json");

const { getReviewById, getAllReviews, getReviewsByStyle, getReviewsByBrands, insertReview, updateReviewStars, deleteReviewById } = require("./repository");

describe("Ramen reviews repository", () => {
  afterAll(() => {
    pool.end();
  });

  it("getAllReviews() should get all reviews", async () => {
    const result = await getAllReviews();
    expect(result[100]).toEqual(ramenReviews[100]);
  });

  it("getReviewById() should get a review by id", async () => {
    const review = ramenReviews[parseInt(JSON.stringify(Math.random())[2])];
    const result = await getReviewById(review.id);
    expect(result.id).toEqual(review.id);
  });

  it("getReviewsByStyle() should get a review by packaging style", async () => {
    const style = "Pack";
    const reviews = await getReviewsByStyle(style);
    expect(reviews[0].packagingStyle).toBe(style);
  });

  it("getReviewsByBrands() should get a review for a set of brands", async () => {
    const brands = ["Westbrae", "Smack"];
    const reviews = await getReviewsByBrands(brands);
    expect(brands).toContain(reviews[0].brand);
  });

  it("insertReview() should insert a review with the correct id", async () => {
    const review = {
      brand: "Culley's",
      variety: "World's Second Hottest Ramen Noodles",
      packagingStyle: "Bowl",
      country: "New Zealand",
      rating: 3.5,
    };
    const expected = await insertReview(review);

    expect(expected).toHaveProperty("id");
  });

  it("updateReviewStars() should update a review star rating", async () => {
    const rating = 2;
    const review = ramenReviews[parseInt(JSON.stringify(Math.random())[2])];
    const updatedReview = await updateReviewStars(review.id, rating);
    expect(updatedReview.rating).toEqual(rating);
  });

  it("deleteReviewById() should delete a review by id and return false on failure", async () => {
    const unexistentId = 999999;
    expect(await deleteReviewById(unexistentId)).toBe(false);
  });
});
