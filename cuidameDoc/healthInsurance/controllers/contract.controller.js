  // controllers/ContractController.js
const contractService = require('../services/contractServices.service');

exports.createContract = async (req, res) => {
    try {
        const { health_insurance_id, type, start_date, end_date } = req.body;
        const newContract = await contractService.createContract(health_insurance_id, type, start_date, end_date);
        res.status(200).json({ message: "Contrato creado con éxito!", newContract, success: true });
    } catch (error) {
        res.status(400).json({ message: "Error al crear el contrato.", error: error.message, success: false });
    }
};

exports.getContract = async (req, res) => {
    try {
        const contract = await contractService.getContract(req.params.id);
        if (!contract) {
            return res.status(404).json({ message: "Contrato no encontrado" });
        }
        res.json(contract);
    } catch (error) {
        res.status(400).json({ message: "Error al obtener el contrato.", error: error.message });
    }
};

exports.getAllContracts = async (req, res) => {
    try {
        const contracts = await contractService.getAllContracts();
        res.json(contracts);
    } catch (error) {
        res.status(400).json({ message: "Error al obtener los contratos.", error: error.message });
    }
};

exports.updateContract = async (req, res) => {
    try {
        const { health_insurance_id, type, start_date, end_date } = req.body;
        const updatedContract = await contractService.updateContract(req.params.id, health_insurance_id, type, start_date, end_date);
        res.json(updatedContract);
    } catch (error) {
        res.status(400).json({ message: "Error al actualizar el contrato.", error: error.message });
    }
};

exports.deleteContract = async (req, res) => {
    try {
        await contractService.deleteContract(req.params.id);
        res.json({ message: "Contrato eliminado con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el contrato.", error: error.message });
    }
};
