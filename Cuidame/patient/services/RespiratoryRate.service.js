const respiratoryRateRepository = require('../repositories/respiratoryRate.repository');

exports.createRespiratoryRate = async (patient_id, rate, date) => {
  return respiratoryRateRepository.createRespiratoryRate(patient_id, rate, date);
};

exports.getRespiratoryRateByPatientId = async (patient_id) => {
  return respiratoryRateRepository.getRespiratoryRateByPatientId(patient_id);
};

exports.getRespiratoryRate = async (id) => {
  return respiratoryRateRepository.getRespiratoryRate(id);
};

exports.getAllRespiratoryRates = async () => {
  return respiratoryRateRepository.getAllRespiratoryRates();
};

exports.updateRespiratoryRate = async (id, rate, date) => {
  return respiratoryRateRepository.updateRespiratoryRate(id, rate, date);
};

exports.deleteRespiratoryRate = async (id) => {
  return respiratoryRateRepository.deleteRespiratoryRate(id);
};
