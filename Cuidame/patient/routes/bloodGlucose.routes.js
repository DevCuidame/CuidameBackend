// path: src/routes/bloodGlucose.routes.js
const express = require('express');
const router = express.Router();
const BloodGlucoseController = require('../controllers/bloodGlucose.controller');

router.post('/', BloodGlucoseController.createBloodGlucose);
router.get('/:id', BloodGlucoseController.getBloodGlucose);
router.get('/', BloodGlucoseController.getAllBloodGlucoses);
router.put('/:id', BloodGlucoseController.updateBloodGlucose);
router.delete('/:id', BloodGlucoseController.deleteBloodGlucose);
router.get('/patient/:patient_id', BloodGlucoseController.getBloodGlucoseByPatientId);

module.exports = router;
