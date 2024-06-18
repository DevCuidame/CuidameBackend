const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctor.controller');

router.post('/', doctorController.createDoctor);
router.get('/:id', doctorController.getDoctor);
router.put('/:id', doctorController.updateDoctor);
router.delete('/:id', doctorController.deleteDoctor);
router.get('/', doctorController.getAllDoctors);

module.exports = router;
