const express = require('express');
const router = express.Router();
const controller = require('../../controllers/provider/legal_rep.controller');

router.post('/', controller.createLegalRep);

module.exports = router;
