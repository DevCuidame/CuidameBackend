const express = require('express');
const router = express.Router();
const populationController = require('../controllers/population.controller');

router.post('/', populationController.createPopulation);
router.get('/:id', populationController.getPopulation);
router.get('/', populationController.getAllPopulations);
router.put('/:id', populationController.updatePopulation);
router.delete('/:id', populationController.deletePopulation);

module.exports = router;
