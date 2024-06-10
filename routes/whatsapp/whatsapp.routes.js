const express = require('express');
const router = express.Router();
const whatsappController = require('../../controllers/whatsapp/whatsapp.controller');

router.get('/sendNot', whatsappController.sendNotification);
router.get('/sendPetNotification', whatsappController.sendPetNotification);

module.exports = router;
