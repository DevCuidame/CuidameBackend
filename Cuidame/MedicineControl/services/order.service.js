const orderRepository = require('../repositories/order.repository');

exports.createOrder = async (orderData) => {
  return await orderRepository.createOrder(orderData);
};

exports.getOrder = async (id) => {
  return orderRepository.getOrderById(id);
};

exports.updateOrder = async (id, orderData) => {
  return orderRepository.updateOrder(id, orderData);
};

exports.deleteOrder = async (id) => {
  return orderRepository.deleteOrder(id);
};

exports.getAllOrders = async () => {
  return orderRepository.getAllOrders();
};
