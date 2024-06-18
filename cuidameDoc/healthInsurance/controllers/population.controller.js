// controllers/PopulationController.js
const populationService = require('../services/population.service');

exports.createPopulation = async (req, res) => {
    try {
        const { first_name, last_name, identification_type, identification_number, age, gender, marital_status, place_of_birth, address, category, regiment_type, phone, occupation, status, position, contract_id } = req.body;
        const newPopulation = await populationService.createPopulation(first_name, last_name, identification_type, identification_number, age, gender, marital_status, place_of_birth, address, category, regiment_type, phone, occupation, status, position, contract_id);
        res.status(200).json({ message: "Población creada con éxito!", newPopulation, éxito: true });
    } catch (error) {
        res.status(400).json({ message: "Error al crear la población.", error: error.message, éxito: false });
    }
};

exports.getPopulation = async (req, res) => {
    try {
        const population = await populationService.getPopulation(req.params.id);
        if (!population) {
            return res.status(404).json({ message: "Población no encontrada" });
        }
        res.json(population);
    } catch (error) {
        res.status(400).json({ message: "Error al obtener la población.", error: error.message });
    }
};

exports.getAllPopulations = async (req, res) => {
    try {
        const populations = await populationService.getAllPopulations();
        res.json(populations);
    } catch (error) {
        res.status(400).json({ message: "Error al obtener las poblaciones.", error: error.message });
    }
};

exports.updatePopulation = async (req, res) => {
    try {
        const { first_name, last_name, identification_type, identification_number, age, gender, marital_status, place_of_birth, address, category, regiment_type, phone, occupation, status, position, contract_id } = req.body;
        const updatedPopulation = await populationService.updatePopulation(req.params.id, first_name, last_name, identification_type, identification_number, age, gender, marital_status, place_of_birth, address, category, regiment_type, phone, occupation, status, position, contract_id);
        res.json(updatedPopulation);
    } catch (error) {
        res.status(400).json({ message: "Error al actualizar la población.", error: error.message });
    }
};

exports.deletePopulation = async (req, res) => {
    try {
        await populationService.deletePopulation(req.params.id);
        res.json({ message: "Población eliminada con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la población.", error: error.message });
    }
};
