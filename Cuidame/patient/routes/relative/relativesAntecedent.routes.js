const express = require('express');
const router = express.Router();
const RelativeAntecedentController = require('../../controllers/relative/relativesAntecedent.controller');

router.post('/', RelativeAntecedentController.createRelativeAntecedent);
router.get('/:id', RelativeAntecedentController.getRelativeAntecedent);
router.get('/', RelativeAntecedentController.getAllRelativeAntecedents);
router.put('/:id', RelativeAntecedentController.updateRelativeAntecedent);
router.delete('/:id', RelativeAntecedentController.deleteRelativeAntecedent);

module.exports = router;
