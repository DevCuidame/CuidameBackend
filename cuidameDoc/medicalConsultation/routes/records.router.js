const express = require('express');
const router = express.Router();
const recordsController = require('../controllers/records.controller');

router.post('/', recordsController.createRecord);
router.get('/:id', recordsController.getRecord);
router.get('/', recordsController.getAllRecords);
router.put('/:id', recordsController.updateRecord);
router.delete('/:id', recordsController.deleteRecord);

module.exports = router;
