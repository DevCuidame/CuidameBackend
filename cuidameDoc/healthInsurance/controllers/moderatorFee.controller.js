// controllers/ModeratorFeeController.js
const moderatorFeeService = require('../services/moderatorFee.service');

exports.createModeratorFee = async (req, res) => {
    try {
        const { health_insurance_id, name, price, income_range, category, copayment } = req.body;
        const newModeratorFee = await moderatorFeeService.createModeratorFee(health_insurance_id, name, price, income_range, category, copayment);
        return res.status(200).json({ message: "Cuota moderadora creada con éxito!", newModeratorFee, success: true });
    } catch (error) {
        return res.status(400).json({ message: "Error al crear la cuota moderadora.", error: error.message, success: false });
    }
};

exports.getModeratorFee = async (req, res) => {
    try {
        const moderatorFee = await moderatorFeeService.getModeratorFee(req.params.id);
        if (!moderatorFee) {
            return res.status(404).json({ message: "Cuota moderadora no encontrada" });
        }
       return res.status(200).json({moderatorFee, success: true });
    } catch (error) {
        return res.status(400).json({ message: "Error al obtener la cuota moderadora.", error: error.message, success: false });
    }
};

exports.getAllModeratorFees = async (req, res) => {
    try {
        const moderatorFees = await moderatorFeeService.getAllModeratorFees();
       return res.status(200).json({moderatorFees, success: true });
    } catch (error) {
        return res.status(400).json({ message: "Error al obtener las cuotas moderadoras.", error: error.message, success: false });
    }
};

exports.updateModeratorFee = async (req, res) => {
    try {
        const { health_insurance_id, name, price, income_range, category, copayment } = req.body;
        const updatedModeratorFee = await moderatorFeeService.updateModeratorFee(req.params.id, health_insurance_id, name, price, income_range, category, copayment);
       return res.status(200).json({updatedModeratorFee, success: true });
    } catch (error) {
        return res.status(400).json({ message: "Error al actualizar la cuota moderadora.", error: error.message, success: false });
    }
};

exports.deleteModeratorFee = async (req, res) => {
    try {
        await moderatorFeeService.deleteModeratorFee(req.params.id);
       return res.status(200).json({ message: "Cuota moderadora eliminada con éxito", success: true  });
    } catch (error) {
        return res.status(500).json({ message: "Error al eliminar la cuota moderadora.", error: error.message, success: false });
    }
};
