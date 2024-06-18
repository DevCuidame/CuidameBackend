const express = require('express');
const router = express.Router();
const userRoleController = require('../controllers/userRole.controller');

// Rutas para UserRole
router.post('/', userRoleController.createUserRole);
router.get('/:id', userRoleController.getUserRole);
router.put('/:id', userRoleController.updateUserRole);
router.delete('/:id', userRoleController.deleteUserRole);
router.get('/', userRoleController.getAllUserRoles);

module.exports = router;
