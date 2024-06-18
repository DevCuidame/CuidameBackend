const express = require('express');
const router = express.Router();
const companyController = require('../controllers/company.controller');

router.post('/', companyController.createCompany);
router.get('/:id', companyController.getCompany);
router.put('/:id', companyController.updateCompany);
router.delete('/:id', companyController.deleteCompany);
router.get('/', companyController.getAllCompanies);

module.exports = router;
