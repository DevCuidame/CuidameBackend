// services/MedicalConsultationService.js
const medicalConsultationRepository = require('../repositories/medicalConsultation.repository');

exports.createMedicalConsultation = async (relative_id, type, city_id, date, reason) => {
  return medicalConsultationRepository.createMedicalConsultation(relative_id, type, city_id, date, reason);
};

exports.getMedicalConsultation = async (id) => {
  return medicalConsultationRepository.getMedicalConsultation(id);
};

exports.getAllMedicalConsultations = async () => {
  return medicalConsultationRepository.getAllMedicalConsultations();
};

exports.updateMedicalConsultation = async (id, relative_id, type, city_id, date, reason) => {
  return medicalConsultationRepository.updateMedicalConsultation(id, relative_id, type, city_id, date, reason);
};

exports.deleteMedicalConsultation = async (id) => {
  return medicalConsultationRepository.deleteMedicalConsultation(id);
};
