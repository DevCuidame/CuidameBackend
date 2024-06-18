// controllers/BondsController.js
const bondsService = require('../services/bonds.service');

exports.createBond = async (req, res) => {
    try {
        const { health_insurance_id, name, price } = req.body;
        const newBond = await bondsService.createBond(health_insurance_id, name, price);
        res.status(200).json({ message: "Bonificación creada con éxito!", newBond, success: true });
    } catch (error) {
        res.status(400).json({ message: "Error al crear la bonificación.", error: error.message, success: false });
    }
};

exports.getBond = async (req, res) => {
    try {
        const bond = await bondsService.getBond(req.params.id);
        if (!bond) {
            return res.status(404).json({ message: "Bonificación no encontrada" });
        }
        res.json(bond);
    } catch (error) {
        res.status(400).json({ message: "Error al obtener la bonificación.", error: error.message });
    }
};

exports.getAllBonds = async (req, res) => {
    try {
        const bonds = await bondsService.getAllBonds();
        res.json(bonds);
    } catch (error) {
        res.status(400).json({ message: "Error al obtener las bonificaciones.", error: error.message });
    }
};

exports.updateBond = async (req, res) => {
    try {
        const { health_insurance_id, name, price } = req.body;
        const updatedBond = await bondsService.updateBond(req.params.id, health_insurance_id, name, price);
        res.json(updatedBond);
    } catch (error) {
        res.status(400).json({ message: "Error al actualizar la bonificación.", error: error.message });
    }
};

exports.deleteBond = async (req, res) => {
    try {
        await bondsService.deleteBond(req.params.id);
        res.json({ message: "Bonificación eliminada con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la bonificación.", error: error.message });
    }
};
