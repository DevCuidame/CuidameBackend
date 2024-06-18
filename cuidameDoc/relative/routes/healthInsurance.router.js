const express = require('express');
const router = express.Router();
const healthInsuranceController = require('../controllers/healthInsurance.controller');

router.post('/', healthInsuranceController.createHealthInsurance);
router.get('/:id', healthInsuranceController.getHealthInsurance);
router.put('/:id', healthInsuranceController.updateHealthInsurance);
router.delete('/:id', healthInsuranceController.deleteHealthInsurance);
router.get('/', healthInsuranceController.getAllHealthInsurances);

module.exports = router;
