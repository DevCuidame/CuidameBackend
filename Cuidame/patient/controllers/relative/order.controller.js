const orderService = require("../../services/relative/order.service");

exports.createOrder = async (req, res) => {
    try {
        const orderData = req.body;

        // Llamamos al servicio para crear la orden y obtenemos el id
        const orderId = await orderService.createOrder(orderData);

        // Respondemos con el id de la orden recién creada
        res.status(201).json({ success: true, data: { orderId } });
    } catch (error) {
        console.error("Error en createOrder Controller:", error.message);
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.getOrder = async (req, res) => {
    try {
        const idOrder = req.params.id;
        const order = await orderService.getOrder(idOrder);
        if (!order) {
        return res.status(404).json({
            message: "Orden no encontrada",
            success: false,
        });
        }
        return res.status(200).json({
        order,
        success: true,
        });
    } catch (error) {
        return res.status(400).json({
        message: "Error al obtener la orden",
        error: error.message,
        success: false,
        });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const id = req.params.id; 
        const orderData = req.body; 
        console.log(id);
        console.log(orderData);

        const updatedOrder = await orderService.updateOrder(id, orderData);

        return res.status(200).json({
            message: "Orden actualizada correctamente",
            updatedOrder,
            success: true,
        });
    } catch (error) {
        console.error("Error in updateOrder Controller:", error.message);
        return res.status(400).json({
        message: "Error al actualizar la orden",
        error: error.message,
        success: false,
        });
    }
};
  

exports.deleteOrder = async (req, res) => {
    try {
        const idOrder = req.params.id;
        await orderService.deleteOrder(idOrder);
        return res.status(200).json({
        message: "Orden eliminada correctamente",
        success: true,
        });
    } catch (error) {
        return res.status(500).json({
        message: "Error al eliminar la orden",
        error: error.message,
        success: false,
        });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        return res.status(200).json({
        orders,
        success: true,
        });
    } catch (error) {
        return res.status(400).json({
        message: "Error al obtener las órdenes",
        error: error.message,
        success: false,
        });
    }
};
