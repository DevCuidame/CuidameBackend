const express = require('express');
const router = express.Router();
const contractController = require('../controllers/contract.controller');

router.post('/', contractController.createContract);
router.get('/:id', contractController.getContract);
router.get('/', contractController.getAllContracts);
router.put('/:id', contractController.updateContract);
router.delete('/:id', contractController.deleteContract);

module.exports = router;
