const express = require('express');
const router = express.Router();
const siteController = require('../controllers/sites.controller');

router.post('/', siteController.createSite);
router.get('/:id', siteController.getSite);
router.put('/:id', siteController.updateSite);
router.delete('/:id', siteController.deleteSite);
router.get('/', siteController.getAllSites);

module.exports = router;
