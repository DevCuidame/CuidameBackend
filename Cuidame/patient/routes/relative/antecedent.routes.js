const express = require('express');
const router = express.Router();
const AntecedentController = require('../../controllers/relative/antecedent.controller');

router.post('/', AntecedentController.createAntecedent);
router.get('/:id', AntecedentController.getAntecedent);
router.get('/', AntecedentController.getAllAntecedents);
router.put('/:id', AntecedentController.updateAntecedent);
router.delete('/:id', AntecedentController.deleteAntecedent);

module.exports = router;
