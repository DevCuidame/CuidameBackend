// controllers/ContractServiceController.js
const contractServiceService = require('../services/contractServices.service');

exports.createContractService = async (req, res) => {
    try {
        const { contract_id, name, type, price } = req.body;
        const newContractService = await contractServiceService.createContractService(contract_id, name, type, price);
        return res.status(200).json({ message: "Servicio del contrato creado con éxito!", newContractService, success: true });
    } catch (error) {
        return res.status(400).json({ message: "Error al crear el servicio del contrato.", error: error.message, success: false });
    }
};

exports.getContractService = async (req, res) => {
    try {
        const contractService = await contractServiceService.getContractService(req.params.id);
        if (!contractService) {
            return res.status(404).json({ message: "Servicio del contrato no encontrado", success: false  });
        }
        return res.status(200).json({contractService, success: true });
    } catch (error) {
        return res.status(400).json({ message: "Error al obtener el servicio del contrato.", error: error.message, success: false });
    }
};

exports.getAllContractServices = async (req, res) => {
    try {
        const contractServices = await contractServiceService.getAllContractServices();
        return res.status(200).json({contractServices, success: true });
    } catch (error) {
        return res.status(400).json({ message: "Error al obtener los servicios del contrato.", error: error.message , success: false});
    }
};

exports.updateContractService = async (req, res) => {
    try {
        const { contract_id, name, type, price } = req.body;
        const updatedContractService = await contractServiceService.updateContractService(req.params.id, contract_id, name, type, price);
        return res.status(200).json({updatedContractService, success: true });
    } catch (error) {
        return res.status(400).json({ message: "Error al actualizar el servicio del contrato.", error: error.message, success: false });
    }
};

exports.deleteContractService = async (req, res) => {
    try {
        await contractServiceService.deleteContractService(req.params.id);
        return res.status(200).json({ message: "Servicio del contrato eliminado con éxito", success: true  });
    } catch (error) {
        return res.status(500).json({ message: "Error al eliminar el servicio del contrato.", error: error.message, success: false  });
    }
};
