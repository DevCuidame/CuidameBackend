// routes/habits.routes.js
const express = require('express');
const router = express.Router();
const habitsController = require('../controllers/habits.controller');

// Rutas para hábitos
router.post('/', habitsController.createHabits);
router.get('/:id', habitsController.getHabits);
router.get('/', habitsController.getAllHabits);
router.put('/:id', habitsController.updateHabits);
router.delete('/:id', habitsController.deleteHabits);

module.exports = router;
