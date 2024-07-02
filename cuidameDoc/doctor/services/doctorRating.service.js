// services/DoctorRatingService.js
const doctorRatingRepository = require('../repositories/doctorRating.repository');

exports.createRating = async (rater_user_id, rated_doctor_id, rating) => {
  return doctorRatingRepository.createRating(rater_user_id, rated_doctor_id, rating);
};

exports.getRating = async (id) => {
  return doctorRatingRepository.getRating(id);
};

exports.getAllRatings = async () => {
  return doctorRatingRepository.getAllRatings();
};

exports.getAverageRating = async (rated_doctor_id) => {
  return doctorRatingRepository.getAverageRating(rated_doctor_id);
};

exports.getUserAverageRating = async (rated_user_id) => {
  const averageRating = await doctorRatingRepository.getAverageRating(rated_user_id);
  return averageRating;
};

exports.deleteRating = async (rater_user_id, rated_doctor_id) => {
  return doctorRatingRepository.deleteRating(rater_user_id, rated_doctor_id);
};

exports.getStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;
  return '★'.repeat(fullStars) + '☆'.repeat(emptyStars);
};
