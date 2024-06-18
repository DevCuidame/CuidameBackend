const express = require('express');
const router = express.Router();
const moderatorFeeController = require('../controllers/moderatorFee.controller');

router.post('/', moderatorFeeController.createModeratorFee);
router.get('/:id', moderatorFeeController.getModeratorFee);
router.get('/', moderatorFeeController.getAllModeratorFees);
router.put('/:id', moderatorFeeController.updateModeratorFee);
router.delete('/:id', moderatorFeeController.deleteModeratorFee);

module.exports = router;
