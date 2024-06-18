const express = require('express');
const router = express.Router();
const regimentTypeController = require('../controllers/regimentType.controller');

router.post('/', regimentTypeController.createRegimentType);
router.get('/:id', regimentTypeController.getRegimentType);
router.get('/', regimentTypeController.getAllRegimentTypes);
router.put('/:id', regimentTypeController.updateRegimentType);
router.delete('/:id', regimentTypeController.deleteRegimentType);

module.exports = router;
