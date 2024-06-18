// routes/gynecoObstetrics.routes.js
const express = require('express');
const router = express.Router();
const gynecoObstetricsController = require('../controllers/gynecoObstetrics.controller');

// Rutas para datos de ginecología y obstetricia
router.post('/', gynecoObstetricsController.createGynecoObstetrics);
router.get('/:id', gynecoObstetricsController.getGynecoObstetrics);
router.get('/', gynecoObstetricsController.getAllGynecoObstetrics);
router.put('/:id', gynecoObstetricsController.updateGynecoObstetrics);
router.delete('/:id', gynecoObstetricsController.deleteGynecoObstetrics);

module.exports = router;
