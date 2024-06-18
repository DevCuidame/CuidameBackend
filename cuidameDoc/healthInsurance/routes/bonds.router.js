const express = require('express');
const router = express.Router();
const bondsController = require('../controllers/bonds.controller');

router.post('/', bondsController.createBond);
router.get('/:id', bondsController.getBond);
router.get('/', bondsController.getAllBonds);
router.put('/:id', bondsController.updateBond);
router.delete('/:id', bondsController.deleteBond);

module.exports = router;
