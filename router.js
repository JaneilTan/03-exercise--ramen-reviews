const express = require("express");
const router = express.Router();
const repository = require("./repository");

// create a review
router.post("/reviews/", async (req, res) => {
  const review = req.body;
  const newReview = await repository.insertReview(review);
  res.json(newReview);
});

// get all reviews
router.get("/reviews/", async (req, res) => {
  const { style, brands } = req.query;
  let reviews = [];
  if (style) {
    reviews = await repository.getReviewsByStyle(style);
  } else if (brands) {
    const arrayOfBrands = brands.split(",");
    reviews = await repository.getReviewsByBrands(arrayOfBrands);
  } else {
    reviews = await repository.getAllReviews();
  }
  res.json(reviews);
});

// get a review
router.get("/reviews/:id", async (req, res) => {
  const { id } = req.params;
  const review = await repository.getReviewById(id);
  res.json(review);
});

// update a review
router.patch("/reviews/:id", async (req, res) => {
  const { id } = req.params;
  const { rating } = req.body;
  const updatedReview = await repository.updateReviewStars(id, rating);
  res.json(updatedReview);
});

// delete a review
router.delete("/reviews/:id", async (req, res) => {
  const { id } = req.params;
  const numberOfDeletedReviews = await repository.deleteReviewById(id);
  res.json(`Reviews deleted: ${numberOfDeletedReviews}`);
});

module.exports = router;
