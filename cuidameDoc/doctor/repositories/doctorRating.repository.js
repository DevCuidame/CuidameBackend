const pool = require('../db');

exports.createRating = async (rater_user_id, rated_doctor_id, rating) => {
  const query = `
    INSERT INTO user_ratings (rater_user_id, rated_doctor_id, rating)
    VALUES ($1, $2, $3)
    ON CONFLICT (rater_user_id, rated_doctor_id)
    DO UPDATE SET rating = EXCLUDED.rating, updated_at = CURRENT_TIMESTAMP
    RETURNING *;
  `;
  const values = [rater_user_id, rated_doctor_id, rating];
  const result = await pool.query(query, values);
  return result.rows[0];
};

exports.getRating = async (id) => {
  const query = 'SELECT * FROM user_ratings WHERE id = $1';
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

exports.getAllRatings = async () => {
  const query = 'SELECT * FROM user_ratings';
  const result = await pool.query(query);
  return result.rows;
};

exports.getAverageRating = async (rated_doctor_id) => {
  const query = `
    SELECT AVG(rating) as average_rating
    FROM user_ratings
    WHERE rated_doctor_id = $1;
  `;
  const result = await pool.query(query, [rated_doctor_id]);
  return result.rows[0].average_rating;
};

exports.deleteRating = async (rater_user_id, rated_doctor_id) => {
  const query = 'DELETE FROM user_ratings WHERE rater_user_id = $1 AND rated_doctor_id = $2';
  await pool.query(query, [rater_user_id, rated_doctor_id]);
};
