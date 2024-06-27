const express = require('express');
const router = express.Router();
const whatsappController = require('../../controllers/whatsapp/whatsapp.controller');

router.get('/sendNot', whatsappController.sendNotification);
router.get('/sendPetNotification', whatsappController.sendPetNotification);
router.get('/sendWelcomeMessageToAll', whatsappController.sendWelcomeMessagesToAll);
module.exports = router;
