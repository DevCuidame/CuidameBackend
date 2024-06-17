const express = require('express');
const router = express.Router();
const appointmentController = require('../../controllers/appointment/appointment.controller');

router.post('/', appointmentController.createAppointment);
router.get('/:id', appointmentController.getAppointment);
router.put('/:id', appointmentController.updateAppointment);
router.post('/:id/cancel', appointmentController.cancelAppointment);
router.get('/', appointmentController.getAllAppointments);
router.get('/user/:userId', appointmentController.getAppointmentsByUser);
router.get('/doctor/:doctorId', appointmentController.getAppointmentsByDoctor);

module.exports = router;
