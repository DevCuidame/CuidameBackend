// services/OtherSpecialtiesService.js
const otherSpecialtiesRepository = require('../repositories/otherSpecialties.repository');

exports.createOtherSpecialty = async (medical_consult_id, type, date, concept, result, pathology_report) => {
  return otherSpecialtiesRepository.createOtherSpecialty(medical_consult_id, type, date, concept, result, pathology_report);
};

exports.getOtherSpecialty = async (id) => {
  return otherSpecialtiesRepository.getOtherSpecialty(id);
};

exports.getAllOtherSpecialties = async () => {
  return otherSpecialtiesRepository.getAllOtherSpecialties();
};

exports.updateOtherSpecialty = async (id, medical_consult_id, type, date, concept, result, pathology_report) => {
  return otherSpecialtiesRepository.updateOtherSpecialty(id, medical_consult_id, type, date, concept, result, pathology_report);
};

exports.deleteOtherSpecialty = async (id) => {
  return otherSpecialtiesRepository.deleteOtherSpecialty(id);
};
