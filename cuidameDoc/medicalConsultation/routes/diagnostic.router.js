const express = require('express');
const router = express.Router();
const diagnosticController = require('../controllers/diagnostic.controller');

router.post('/', diagnosticController.createDiagnostic);
router.get('/:id', diagnosticController.getDiagnostic);
router.get('/', diagnosticController.getAllDiagnostics);
router.put('/:id', diagnosticController.updateDiagnostic);
router.delete('/:id', diagnosticController.deleteDiagnostic);

module.exports = router;
