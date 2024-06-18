const express = require('express');
const router = express.Router();
const appointmentBreakdownController = require('../controllers/appointmentBreackdown.controller');

router.post('/', appointmentBreakdownController.createAppointmentBreakdown);
router.get('/:id', appointmentBreakdownController.getAppointmentBreakdown);
router.put('/:id', appointmentBreakdownController.updateAppointmentBreakdown);
router.delete('/:id', appointmentBreakdownController.deleteAppointmentBreakdown);
router.get('/', appointmentBreakdownController.getAllAppointmentBreakdowns);

module.exports = router;
