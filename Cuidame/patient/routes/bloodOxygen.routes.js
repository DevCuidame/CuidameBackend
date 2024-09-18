// path: src/routes/bloodOxygen.routes.js
const express = require('express');
const router = express.Router();
const BloodOxygenController = require('../controllers/bloodOxygen.controller');

router.post('/', BloodOxygenController.createBloodOxygen);
router.get('/:id', BloodOxygenController.getBloodOxygen);
router.get('/', BloodOxygenController.getAllBloodOxygens);
router.put('/:id', BloodOxygenController.updateBloodOxygen);
router.delete('/:id', BloodOxygenController.deleteBloodOxygen);
router.get('/patient/:patient_id', BloodOxygenController.getBloodOxygenByPatientId);

module.exports = router;
