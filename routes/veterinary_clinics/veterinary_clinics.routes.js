// routes/ProviderRoutes.js
const express = require('express');
const router = express.Router();
const veterinaryController = require('../../controllers/veterinary_clinics/veterinary_clinics.controller');

router.get('/', veterinaryController.getAllVeterinary);
router.get('/:service', veterinaryController.getByService);


module.exports = router;
