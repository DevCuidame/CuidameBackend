// path: src/services/bloodOxygen.service.js
const bloodOxygenRepository = require('../repositories/bloodOxygen.repository');

exports.createBloodOxygen = async (patient_id, oxygen_level, date) => {
  return bloodOxygenRepository.createBloodOxygen(patient_id, oxygen_level, date);
};

exports.getBloodOxygenByPatientId = async (patient_id) => {
  return bloodOxygenRepository.getBloodOxygenByPatientId(patient_id);
};

exports.getBloodOxygen = async (id) => {
  return bloodOxygenRepository.getBloodOxygen(id);
};

exports.getAllBloodOxygens = async () => {
  return bloodOxygenRepository.getAllBloodOxygens();
};

exports.updateBloodOxygen = async (id, oxygen_level, date) => {
  return bloodOxygenRepository.updateBloodOxygen(id, oxygen_level, date);
};

exports.deleteBloodOxygen = async (id) => {
  return bloodOxygenRepository.deleteBloodOxygen(id);
};
