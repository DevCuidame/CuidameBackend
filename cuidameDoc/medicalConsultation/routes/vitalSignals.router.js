const express = require('express');
const router = express.Router();
const vitalSignalsController = require('../controllers/vitalSignals.controller');

router.post('/', vitalSignalsController.createVitalSignals);
router.get('/:id', vitalSignalsController.getVitalSignalsById);
router.get('/', vitalSignalsController.getAllVitalSignals);
router.put('/:id', vitalSignalsController.updateVitalSignals);
router.delete('/:id', vitalSignalsController.deleteVitalSignals);

module.exports = router;
