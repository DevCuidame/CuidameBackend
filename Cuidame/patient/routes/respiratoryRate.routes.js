const express = require('express');
const router = express.Router();
const RespiratoryRateController = require('../controllers/RespiratoryRate.controller.js');

router.post('/', RespiratoryRateController.createRespiratoryRate);
router.get('/:id', RespiratoryRateController.getRespiratoryRate);
router.get('/', RespiratoryRateController.getAllRespiratoryRates);
router.put('/:id', RespiratoryRateController.updateRespiratoryRate);
router.delete('/:id', RespiratoryRateController.deleteRespiratoryRate);
router.get('/patient/:patient_id', RespiratoryRateController.getRespiratoryRateByPatientId);


module.exports = router;
