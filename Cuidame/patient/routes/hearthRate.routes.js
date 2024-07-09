const express = require('express');
const router = express.Router();
const HeartRateController = require('../controllers/HeartRate.controller');

router.post('/', HeartRateController.createHeartRate);
router.get('/:id', HeartRateController.getHeartRate);
router.get('/', HeartRateController.getAllHeartRates);
router.put('/:id', HeartRateController.updateHeartRate);
router.delete('/:id', HeartRateController.deleteHeartRate);
router.get('/patient/:patient_id', HeartRateController.getHeartRateByPatientId);


module.exports = router;
