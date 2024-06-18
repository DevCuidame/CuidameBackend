const express = require('express');
const router = express.Router();
const relativeController = require('../controllers/appointment.controller');

router.post('/', relativeController.createAppointment);
router.get('/:id', relativeController.getAppointment);
router.put('/:id', relativeController.updateAppointment);
router.delete('/:id', relativeController.deleteAppointment);
router.get('/', relativeController.getAllAppointments);

module.exports = router;
