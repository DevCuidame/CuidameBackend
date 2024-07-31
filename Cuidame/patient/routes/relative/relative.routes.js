const express = require('express');
const router = express.Router();
const RelativeController = require('../../controllers/relative/relative.controller');

router.post('/', RelativeController.createRelative);
router.get('/:id', RelativeController.getRelative);
router.get('/', RelativeController.getAllRelatives);
router.put('/:id', RelativeController.updateRelative);
router.delete('/:id', RelativeController.deleteRelative);
router.get('/all-data/:id', RelativeController.getRelativeWithAllInfo);

module.exports = router;
