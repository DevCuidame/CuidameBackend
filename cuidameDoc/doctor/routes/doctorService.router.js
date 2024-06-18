const express = require('express');
const router = express.Router();
const doctorServiceController = require('../controllers/doctorService.controller');

router.post('/', doctorServiceController.crearServicioMedico);
router.get('/:id', doctorServiceController.obtenerServicioMedico);
router.get('/', doctorServiceController.obtenerTodosLosServiciosMedicos);
router.put('/:id', doctorServiceController.actualizarServicioMedico);
router.delete('/:id', doctorServiceController.eliminarServicioMedico);

module.exports = router;
