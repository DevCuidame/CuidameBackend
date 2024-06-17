// services/ContractService.js
const contractRepository = require('../repositories/contract.repository');

exports.createContract = async (health_insurance_id, type, start_date, end_date) => {
  return contractRepository.createContract(health_insurance_id, type, start_date, end_date);
};

exports.getContract = async (id) => {
  return contractRepository.getContract(id);
};

exports.getAllContracts = async () => {
  return contractRepository.getAllContracts();
};

exports.updateContract = async (id, health_insurance_id, type, start_date, end_date) => {
  return contractRepository.updateContract(id, health_insurance_id, type, start_date, end_date);
};

exports.deleteContract = async (id) => {
  return contractRepository.deleteContract(id);
};
