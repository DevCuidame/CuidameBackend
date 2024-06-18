const express = require('express');
const router = express.Router();
const medicalConsultationController = require('../controllers/medicalConsultation.controller');

router.post('/', medicalConsultationController.createMedicalConsultation);
router.get('/:id', medicalConsultationController.getMedicalConsultation);
router.get('/', medicalConsultationController.getAllMedicalConsultations);
router.put('/:id', medicalConsultationController.updateMedicalConsultation);
router.delete('/:id', medicalConsultationController.deleteMedicalConsultation);

module.exports = router;
