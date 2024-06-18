// controllers/ContractServiceController.js
const contractServiceService = require('../services/contractServices.service');

exports.createContractService = async (req, res) => {
    try {
        const { contract_id, name, type, price } = req.body;
        const newContractService = await contractServiceService.createContractService(contract_id, name, type, price);
        res.status(200).json({ message: "Servicio del contrato creado con éxito!", newContractService, success: true });
    } catch (error) {
        res.status(400).json({ message: "Error al crear el servicio del contrato.", error: error.message, success: false });
    }
};

exports.getContractService = async (req, res) => {
    try {
        const contractService = await contractServiceService.getContractService(req.params.id);
        if (!contractService) {
            return res.status(404).json({ message: "Servicio del contrato no encontrado" });
        }
        res.json(contractService);
    } catch (error) {
        res.status(400).json({ message: "Error al obtener el servicio del contrato.", error: error.message });
    }
};

exports.getAllContractServices = async (req, res) => {
    try {
        const contractServices = await contractServiceService.getAllContractServices();
        res.json(contractServices);
    } catch (error) {
        res.status(400).json({ message: "Error al obtener los servicios del contrato.", error: error.message });
    }
};

exports.updateContractService = async (req, res) => {
    try {
        const { contract_id, name, type, price } = req.body;
        const updatedContractService = await contractServiceService.updateContractService(req.params.id, contract_id, name, type, price);
        res.json(updatedContractService);
    } catch (error) {
        res.status(400).json({ message: "Error al actualizar el servicio del contrato.", error: error.message });
    }
};

exports.deleteContractService = async (req, res) => {
    try {
        await contractServiceService.deleteContractService(req.params.id);
        res.json({ message: "Servicio del contrato eliminado con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el servicio del contrato.", error: error.message });
    }
};
