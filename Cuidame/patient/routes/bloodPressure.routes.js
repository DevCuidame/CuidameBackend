const express = require('express');
const router = express.Router();
const BloodPressureController = require('../controllers/BloodPressure.controller');

router.post('/', BloodPressureController.createBloodPressure);
router.get('/:id', BloodPressureController.getBloodPressure);
router.get('/', BloodPressureController.getAllBloodPressures);
router.put('/:id', BloodPressureController.updateBloodPressure);
router.delete('/:id', BloodPressureController.deleteBloodPressure);
router.get('/patient/:patient_id', BloodPressureController.getBloodPressureByPatientId);


module.exports = router;
