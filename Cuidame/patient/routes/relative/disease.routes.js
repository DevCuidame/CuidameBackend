const express = require('express');
const router = express.Router();
const DiseaseController = require('../../controllers/relative/disease.controller');

router.post('/', DiseaseController.createDisease);
router.get('/:id', DiseaseController.getDisease);
router.get('/', DiseaseController.getAllDiseases);
router.put('/:id', DiseaseController.updateDiseaseByRelative);
router.delete('/:id', DiseaseController.deleteDisease);

module.exports = router;
