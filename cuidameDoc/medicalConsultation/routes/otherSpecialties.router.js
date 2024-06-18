const express = require('express');
const router = express.Router();
const otherSpecialtiesController = require('../controllers/otherSpecialties.controller');

router.post('/', otherSpecialtiesController.createOtherSpecialty);
router.get('/:id', otherSpecialtiesController.getOtherSpecialty);
router.get('/', otherSpecialtiesController.getAllOtherSpecialties);
router.put('/:id', otherSpecialtiesController.updateOtherSpecialty);
router.delete('/:id', otherSpecialtiesController.deleteOtherSpecialty);

module.exports = router;
