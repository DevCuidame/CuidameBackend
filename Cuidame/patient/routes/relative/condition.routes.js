const express = require('express');
const router = express.Router();
const ConditionController = require('../../controllers/relative/condition.controller');

router.post('/', ConditionController.createCondition);
router.get('/:id', ConditionController.getCondition);
router.get('/', ConditionController.getAllConditions);
router.put('/:id', ConditionController.updateCondition);
router.delete('/:id', ConditionController.deleteCondition);

module.exports = router;
