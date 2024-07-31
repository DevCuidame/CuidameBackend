const express = require('express');
const router = express.Router();
const AllergyController = require('../../controllers/relative/allergy.controller');

router.post('/', AllergyController.createAllergy);
router.get('/:id', AllergyController.getAllergy);
router.get('/', AllergyController.getAllAllergies);
router.put('/:id', AllergyController.updateAllergy);
router.delete('/:id', AllergyController.deleteAllergy);

module.exports = router;
