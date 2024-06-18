const express = require('express');
const router = express.Router();
const familiarRecordsController = require('../controllers/familarRecords.controller');

router.post('/', familiarRecordsController.createFamiliarRecord);
router.get('/:id', familiarRecordsController.getFamiliarRecord);
router.get('/', familiarRecordsController.getAllFamiliarRecords);
router.put('/:id', familiarRecordsController.updateFamiliarRecord);
router.delete('/:id', familiarRecordsController.deleteFamiliarRecord);

module.exports = router;
