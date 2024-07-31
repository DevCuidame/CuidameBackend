const express = require('express');
const router = express.Router();
const MedicamentController = require('../../controllers/relative/medicament.controller');

router.post('/', MedicamentController.createMedicament);
router.get('/:id', MedicamentController.getMedicament);
router.get('/', MedicamentController.getAllMedicaments);
router.put('/:id', MedicamentController.updateMedicament);
router.delete('/:id', MedicamentController.deleteMedicament);

module.exports = router;
