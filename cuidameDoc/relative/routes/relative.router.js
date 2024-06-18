const express = require('express');
const router = express.Router();
const relativeController = require('../controllers/relative.controller');

router.post('/', relativeController.createRelative);
router.get('/:id', relativeController.getRelative);
router.put('/:id', relativeController.updateRelative);
router.delete('/:id', relativeController.deleteRelative);
router.get('/', relativeController.getAllRelatives);

module.exports = router;
