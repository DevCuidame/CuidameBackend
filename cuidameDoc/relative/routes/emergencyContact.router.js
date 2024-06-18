const express = require('express');
const router = express.Router();
const emergencyContactController = require('../controllers/emergencyContact.controller');

router.post('/', emergencyContactController.createEmergencyContact);
router.get('/:id', emergencyContactController.getEmergencyContact);
router.put('/:id', emergencyContactController.updateEmergencyContact);
router.delete('/:id', emergencyContactController.deleteEmergencyContact);
router.get('/', emergencyContactController.getAllEmergencyContacts);

module.exports = router;
