const pool = require("./db");

const getReviewById = async (id) => {
  try {
    // TODO: Get a review by id. Check the API spec file for details on the Review object.
    const result = await pool.query(`SELECT
    url,
    variety,
    stars AS "rating",
    reviews.id,
    reviews.country_id AS country,
    reviews.brand_id AS brand,
    reviews.packaging_style_id AS "packagingStyle"
  FROM reviews
  WHERE reviews.id = $1;
    
    `, [id]);
    return result.rows[0];
  } catch (error) {
    throw Error(error);
  }
};

const getAllReviews = async () => {
  try {
    // TODO: Get all reviews. Check the API spec file for details on the Review object.
    const result = await pool.query(`SELECT url, reviews.id,
    brands.brand AS brand,
    variety,
    packaging_styles.packaging_style AS "packagingStyle",
    countries.country AS country,
    stars AS "rating"
  FROM reviews
  INNER JOIN brands ON brands.id = reviews.brand_id
  INNER JOIN countries ON countries.id = reviews.country_id
  INNER JOIN packaging_styles ON packaging_styles.id = reviews.packaging_style_id
  ORDER BY ID;
    `);
    
    return result.rows;

  } catch (error) {
    throw Error(error);
  }
};

const getReviewsByStyle = async (style) => {
  try {
    // TODO: Get reviews by style. Check the API spec file for details on the Review object.
    const result = await pool.query(`SELECT packaging_styles.packaging_style AS "packagingStyle"
    FROM reviews
    INNER JOIN packaging_styles ON packaging_styles.id = reviews.packaging_style_id
    WHERE packaging_styles.packaging_style = $1;`, [style]);

    return result.rows;
  } catch (error) {
    throw Error(error);
  }
};

const getReviewsByBrands = async (brands = []) => {
  try {
    // TODO: Get reviews by brands. Check the API spec file for details on the Review object.
    // Note that `brands` is an array
    const result = await pool.query(`SELECT brands.brand AS brand
    FROM reviews
    INNER JOIN brands ON brands.id = reviews.brand_id
    WHERE brands.brand = ANY ($1);`, [brands]);

    return result.rows;
  } catch (error) {
    throw Error(error);
  }
};

const insertReview = async (review) => {
  const { brand, variety, packagingStyle, country, rating } = review;

  try {
    // TODO: Insert a review. Check the API spec file for details on the Review object.
    const { rows } = await pool.query(
    `INSERT INTO reviews (
      brand_id,
      variety,
      packaging_style_id,
      country_id,
      stars)
    VALUES (
      (SELECT id FROM brands WHERE brand = $1),
      $2,
      (SELECT id FROM packaging_styles WHERE packaging_style = $3),
      (SELECT id FROM countries WHERE country = $4),
      $5)
    RETURNING id`,
    [brand, variety, packagingStyle, country, rating]
    );
    return rows[0];
  } catch (error) {
    throw Error(error);
  }
};

const updateReviewStars = async (id, rating) => {
  try {
    // TODO: Update a review. Check the API spec file for details on the Review object.
    const updateTodo = await pool.query(
      `UPDATE reviews 
      SET stars = $1 
      WHERE id = $2 
      RETURNING id, stars AS "rating"`,
      [rating, id]
    );
    return updateTodo.rows[0];  
  } catch (error) {
    throw Error(error);
  }
};

const deleteReviewById = async (id) => {
  try {
    // TODO: Delete a review. Check the API spec file for details on the Review object.
    const { rowCount } = await pool.query(
      `DELETE FROM reviews
      WHERE id = $1`,
      [id]
      );
      return rowCount === 0 ? false : true;
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
