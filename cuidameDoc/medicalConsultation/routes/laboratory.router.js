// routes/laboratory.routes.js
const express = require('express');
const router = express.Router();
const laboratoryController = require('../controllers/laboratory.controller');

// Rutas para laboratorio
router.post('/', laboratoryController.createLaboratory);
router.get('/:id', laboratoryController.getLaboratory);
router.get('/', laboratoryController.getAllLaboratories);
router.put('/:id', laboratoryController.updateLaboratory);
router.delete('/:id', laboratoryController.deleteLaboratory);

module.exports = router;
