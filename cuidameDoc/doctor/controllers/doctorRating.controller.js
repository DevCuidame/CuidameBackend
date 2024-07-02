// controllers/DoctorRatingController.js
const doctorRatingService = require('../services/doctorRating.service');

exports.createRating = async (req, res) => {
  try {
    const { rater_user_id, rated_doctor_id, rating } = req.body;
    const newRating = await doctorRatingService.createRating(rater_user_id, rated_doctor_id, rating);
    res.status(200).json({ message: "¡Calificación creada exitosamente!", newRating, success: true });
  } catch (error) {
    res.status(400).json({ message: "Error al crear calificación.", error: error.message, success: false });
  }
};

exports.getRating = async (req, res) => {
  try {
    const rating = await doctorRatingService.getRating(req.params.id);
    if (!rating) {
      return res.status(404).json({ message: "Calificación no encontrada.", success: false });
    }
    res.status(200).json({ rating, success: true });
  } catch (error) {
    res.status(400).json({ message: "Error al obtener calificación.", error: error.message, success: false });
  }
};

exports.getAllRatings = async (req, res) => {
  try {
    const ratings = await doctorRatingService.getAllRatings();
    res.status(200).json({ ratings, success: true });
  } catch (error) {
    res.status(400).json({ message: "Error al obtener calificaciones.", error: error.message, success: false });
  }
};

exports.getAverageRating = async (req, res) => {
  try {
    const averageRating = await doctorRatingService.getAverageRating(req.params.rated_doctor_id);
    res.status(200).json({ averageRating, success: true });
  } catch (error) {
    res.status(400).json({ message: "Error al obtener calificación promedio.", error: error.message, success: false });
  }
};

exports.getUserAverageRating = async (req, res) => {
  try {
    const averageRating = await doctorRatingService.getUserAverageRating(req.params.rated_user_id);
    const stars = doctorRatingService.getStars(averageRating);
    res.status(200).json({ averageRating, stars, success: true });
  } catch (error) {
    res.status(400).json({ message: "Error al obtener calificación promedio del usuario.", error: error.message, success: false });
  }
};

exports.deleteRating = async (req, res) => {
  try {
    const { rater_user_id, rated_doctor_id } = req.body;
    await doctorRatingService.deleteRating(rater_user_id, rated_doctor_id);
    res.status(200).json({ message: "¡Calificación eliminada exitosamente!", success: true });
  } catch (error) {
    res.status(400).json({ message: "Error al eliminar calificación.", error: error.message, success: false });
  }
};
