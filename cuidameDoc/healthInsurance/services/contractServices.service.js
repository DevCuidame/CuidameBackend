// services/ContractServiceService.js
const contractServiceRepository = require('../repositories/contractServices.repository');

exports.createContractService = async (contract_id, name, type, price) => {
  return contractServiceRepository.createContractService(contract_id, name, type, price);
};

exports.getContractService = async (id) => {
  return contractServiceRepository.getContractService(id);
};

exports.getAllContractServices = async () => {
  return contractServiceRepository.getAllContractServices();
};

exports.updateContractService = async (id, contract_id, name, type, price) => {
  return contractServiceRepository.updateContractService(id, contract_id, name, type, price);
};

exports.deleteContractService = async (id) => {
  return contractServiceRepository.deleteContractService(id);
};
