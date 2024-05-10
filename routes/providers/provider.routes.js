// routes/ProviderRoutes.js
const express = require('express');
const router = express.Router();
const providerController = require('../../controllers/provider/provider.controller');

router.post('/', providerController.createProvider);
router.get('/:id', providerController.getProvider);
router.put('/:id', providerController.updateProvider);
router.delete('/:id', providerController.deleteProvider);

module.exports = router;
