// controllers/PopulationController.js
const populationService = require('../services/population.service');

exports.createPopulation = async (req, res) => {
    try {
        const { first_name, last_name, identification_type, identification_number, age, gender, marital_status, place_of_birth, address, category, regiment_type, phone, occupation, status, position, contract_id } = req.body;
        const newPopulation = await populationService.createPopulation(first_name, last_name, identification_type, identification_number, age, gender, marital_status, place_of_birth, address, category, regiment_type, phone, occupation, status, position, contract_id);
        
        const exists = await populationService.getPopulationByCard(identification_number)
        if (!exists) {
            return res.status(200).json({ message: "Numero de idenficicación ya existe", success: false });
        }
        
        return res.status(200).json({ message: "Población creada con success!", newPopulation, success: true });
    } catch (error) {
        return res.status(400).json({ message: "Error al crear la población.", error: error.message, success: false });
    }
};

exports.getPopulation = async (req, res) => {
    try {
        const population = await populationService.getPopulation(req.params.id);
        if (!population) {
            return res.status(404).json({ message: "Población no encontrada", success: false });
        }
        return res.status(200).json({population, success: true});
    } catch (error) {
        return res.status(400).json({ message: "Error al obtener la población.", error: error.message, success: false});
    }
};

exports.getAllPopulations = async (req, res) => {
    try {
        const populations = await populationService.getAllPopulations();
        return res.status(200).json({populations, success: true});
    } catch (error) {
        return res.status(400).json({ message: "Error al obtener las poblaciones.", error: error.message, success: false});
    }
};

exports.updatePopulation = async (req, res) => {
    try {
        const { first_name, last_name, identification_type, identification_number, age, gender, marital_status, place_of_birth, address, category, regiment_type, phone, occupation, status, position, contract_id } = req.body;
        const updatedPopulation = await populationService.updatePopulation(req.params.id, first_name, last_name, identification_type, identification_number, age, gender, marital_status, place_of_birth, address, category, regiment_type, phone, occupation, status, position, contract_id);
        return res.status(200).json({updatedPopulation, success: true});
    } catch (error) {
        return res.status(400).json({ message: "Error al actualizar la población.", error: error.message, success: false});
    }
};

exports.deletePopulation = async (req, res) => {
    try {
        await populationService.deletePopulation(req.params.id);
        return res.status(200).json({ message: "Población eliminada con success", success: true  });
    } catch (error) {
        return res.status(500).json({ message: "Error al eliminar la población.", error: error.message, success: false});
    }
};
