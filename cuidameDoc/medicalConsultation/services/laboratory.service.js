// services/LaboratoryService.js
const laboratoryRepository = require('../repositories/laboratory.repository');

exports.createLaboratory = async (medical_consult_id, exam_type, exam, date, result, pathology_report) => {
  return laboratoryRepository.createLaboratory(medical_consult_id, exam_type, exam, date, result, pathology_report);
};

exports.getLaboratory = async (id) => {
  return laboratoryRepository.getLaboratory(id);
};

exports.getAllLaboratories = async () => {
  return laboratoryRepository.getAllLaboratories();
};

exports.updateLaboratory = async (id, medical_consult_id, exam_type, exam, date, result, pathology_report) => {
  return laboratoryRepository.updateLaboratory(id, medical_consult_id, exam_type, exam, date, result, pathology_report);
};

exports.deleteLaboratory = async (id) => {
  return laboratoryRepository.deleteLaboratory(id);
};
