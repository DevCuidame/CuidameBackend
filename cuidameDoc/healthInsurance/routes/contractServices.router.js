const express = require('express');
const router = express.Router();
const contractServiceController = require('../controllers/contractServices.controller');

router.post('/', contractServiceController.createContractService);
router.get('/:id', contractServiceController.getContractService);
router.get('/', contractServiceController.getAllContractServices);
router.put('/:id', contractServiceController.updateContractService);
router.delete('/:id', contractServiceController.deleteContractService);

module.exports = router;
