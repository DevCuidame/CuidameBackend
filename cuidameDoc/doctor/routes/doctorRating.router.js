// routes/doctorRating.routes.js
const express = require('express');
const router = express.Router();
const doctorRatingController = require('../controllers/doctorRating.controller');

router.post('/rate', doctorRatingController.createRating);
router.get('/rating/:rated_doctor_id', doctorRatingController.getAverageRating);
router.get('/user-rating/:rated_user_id', doctorRatingController.getUserAverageRating);

module.exports = router;
