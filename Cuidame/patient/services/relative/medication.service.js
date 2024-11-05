// path: src/services/medication.service.js
const medicationRepository = require("../repositories/medication.repository");

exports.createMedication = async (data) => {
  return medicationRepository.createMedication(data);
};

exports.getMedication = async (id) => {
  return medicationRepository.getMedication(id);
};

exports.getAllMedications = async () => {
  return medicationRepository.getAllMedications();
};

exports.updateMedication = async (id, data) => {
  return medicationRepository.updateMedication(id, data);
};

exports.deleteMedication = async (id) => {
  return medicationRepository.deleteMedication(id);
};
