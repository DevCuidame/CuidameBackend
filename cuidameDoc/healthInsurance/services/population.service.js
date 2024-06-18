// services/PopulationService.js
const populationRepository = require('../repositories/population.repository');

exports.createPopulation = async (first_name, last_name, identification_type, identification_number, age, gender, marital_status, place_of_birth, address, category, regiment_type, phone, occupation, status, position, contract_id) => {
  return populationRepository.createPopulation(first_name, last_name, identification_type, identification_number, age, gender, marital_status, place_of_birth, address, category, regiment_type, phone, occupation, status, position, contract_id);
};

exports.getPopulation = async (id) => {
  return populationRepository.getPopulation(id);
};

exports.getPopulationByCard = async (id) => {
  return populationRepository.getPopulationByCard(id);
};

exports.getAllPopulations = async () => {
  return populationRepository.getAllPopulations();
};

exports.updatePopulation = async (id, first_name, last_name, identification_type, identification_number, age, gender, marital_status, place_of_birth, address, category, regiment_type, phone, occupation, status, position, contract_id) => {
  return populationRepository.updatePopulation(id, first_name, last_name, identification_type, identification_number, age, gender, marital_status, place_of_birth, address, category, regiment_type, phone, occupation, status, position, contract_id);
};

exports.deletePopulation = async (id) => {
  return populationRepository.deletePopulation(id);
};
