// controllers/PaymentBillController.js
const paymentBillService = require('../services/paymentBill.service');

exports.createPaymentBill = async (req, res) => {
    try {
        const { health_insurance_id, relative_id, doctor_service_id } = req.body;
        const newPaymentBill = await paymentBillService.createPaymentBill(health_insurance_id, relative_id, doctor_service_id);
        res.status(200).json({ message: "Factura de pago creada con éxito!", newPaymentBill, éxito: true });
    } catch (error) {
        res.status(400).json({ message: "Error al crear la factura de pago.", error: error.message, éxito: false });
    }
};

exports.getPaymentBill = async (req, res) => {
    try {
        const paymentBill = await paymentBillService.getPaymentBill(req.params.id);
        if (!paymentBill) {
            return res.status(404).json({ message: "Factura de pago no encontrada" });
        }
        res.json(paymentBill);
    } catch (error) {
        res.status(400).json({ message: "Error al obtener la factura de pago.", error: error.message });
    }
};

exports.getAllPaymentBills = async (req, res) => {
    try {
        const paymentBills = await paymentBillService.getAllPaymentBills();
        res.json(paymentBills);
    } catch (error) {
        res.status(400).json({ message: "Error al obtener las facturas de pago.", error: error.message });
    }
};

exports.updatePaymentBill = async (req, res) => {
    try {
        const { health_insurance_id, relative_id, doctor_service_id } = req.body;
        const updatedPaymentBill = await paymentBillService.updatePaymentBill(req.params.id, health_insurance_id, relative_id, doctor_service_id);
        res.json(updatedPaymentBill);
    } catch (error) {
        res.status(400).json({ message: "Error al actualizar la factura de pago.", error: error.message });
    }
};

exports.deletePaymentBill = async (req, res) => {
    try {
        await paymentBillService.deletePaymentBill(req.params.id);
        res.json({ message: "Factura de pago eliminada con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la factura de pago.", error: error.message });
    }
};
