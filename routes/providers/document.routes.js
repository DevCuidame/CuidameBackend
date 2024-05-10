const express = require('express');
const router = express.Router();
const documentController = require('../../controllers/provider/document.controller');

router.post('/', documentController.createDocument);
router.get('/:id', documentController.getDocument);
router.put('/:id', documentController.updateDocument);
router.delete('/:id', documentController.deleteDocument);

module.exports = router;
