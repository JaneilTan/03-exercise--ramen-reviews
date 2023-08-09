const pool = require("./db");

const getReviewById = async (id) => {
  try {
    // TODO: Get a review by id. Check the API spec file for details on the Review object.
  } catch (error) {
    throw Error(error);
  }
};

const getAllReviews = async () => {
  try {
    // TODO: Get all reviews. Check the API spec file for details on the Review object.
  } catch (error) {
    throw Error(error);
  }
};

const getReviewsByStyle = async (style) => {
  try {
    // TODO: Get reviews by style. Check the API spec file for details on the Review object.
  } catch (error) {
    throw Error(error);
  }
};

const getReviewsByBrands = async (brands = []) => {
  try {
    // TODO: Get reviews by brands. Check the API spec file for details on the Review object.
    // Note that `brands` is an array
  } catch (error) {
    throw Error(error);
  }
};

const insertReview = async (review) => {
  const { brand, variety, packagingStyle, country, rating } = review;

  try {
    // TODO: Insert a review. Check the API spec file for details on the Review object.
  } catch (error) {
    throw Error(error);
  }
};

const updateReviewStars = async (id, rating) => {
  try {
    // TODO: Update a review. Check the API spec file for details on the Review object.
  } catch (error) {
    throw Error(error);
  }
};

const deleteReviewById = async (id) => {
  try {
    // TODO: Delete a review. Check the API spec file for details on the Review object.
  } catch (error) {
    throw Error(error);
  }
};

module.exports = {
  getReviewById,
  getAllReviews,
  getReviewsByStyle,
  getReviewsByBrands,
  insertReview,
  updateReviewStars,
  deleteReviewById,
};
