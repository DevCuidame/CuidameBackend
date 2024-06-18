const healthInsuranceRepository = require('../repositories/healthInsurance.repository');

exports.createHealthInsurance = async (company, address1, address2, city, phone, email) => {
  return healthInsuranceRepository.createHealthInsurance(company, address1, address2, city, phone, email);
};

exports.getHealthInsurance = async (id) => {
  return healthInsuranceRepository.getHealthInsurance(id);
};

exports.getHealthInsuranceByEmail = async (email) => {
  return healthInsuranceRepository.getHealthInsuranceByEmail(email);
};

exports.updateHealthInsurance = async (id, company, address1, address2, city, phone, email) => {
  return healthInsuranceRepository.updateHealthInsurance(id, company, address1, address2, city, phone, email);
};

exports.deleteHealthInsurance = async (id) => {
  return healthInsuranceRepository.deleteHealthInsurance(id);
};

exports.getAllHealthInsurances = async () => {
  return healthInsuranceRepository.getAllHealthInsurances();
};
