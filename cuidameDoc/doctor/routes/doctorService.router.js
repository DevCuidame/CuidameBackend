const express = require('express');
const router = express.Router();
const doctorServiceController = require('../controllers/doctorService.controller');

router.post('/', doctorServiceController.createDoctorService);
router.get('/:id', doctorServiceController.getDoctorService);
router.get('/', doctorServiceController.getAllDoctorServices);
router.put('/:id', doctorServiceController.updateDoctorService);
router.delete('/:id', doctorServiceController.deleteDoctorService);

module.exports = router;
