const express = require('express');
const router = express.Router();
const VaccineController = require('../../controllers/relative/vaccine.controller');

router.post('/', VaccineController.createVaccine);
router.get('/:id', VaccineController.getVaccine);
router.get('/', VaccineController.getAllVaccines);
router.put('/:id', VaccineController.updateVaccine);
router.delete('/:id', VaccineController.deleteVaccine);

module.exports = router;
