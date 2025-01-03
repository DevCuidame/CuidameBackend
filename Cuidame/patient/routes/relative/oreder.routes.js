const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/relative/order.controller');

router.post('/', orderController.createOrder); // Crear una orden
router.get('/:id', orderController.getOrder); // Obtener una orden por ID
router.get('/patient/:id', orderController.getOrderByIdPatient); // Obtener una orden por ID del paciente
router.put('/:id', orderController.updateOrder); // Actualizar una orden por ID
router.delete('/:id', orderController.deleteOrder); // Eliminar una orden por ID
router.get('/', orderController.getAllOrders); // Obtener todas las órdenes

module.exports = router;
