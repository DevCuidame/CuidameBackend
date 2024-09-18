// path: src/services/bloodGlucose.service.js
const bloodGlucoseRepository = require('../repositories/bloodGlucose.repository');

exports.createBloodGlucose = async (patient_id, glucose_level, date) => {
  return bloodGlucoseRepository.createBloodGlucose(patient_id, glucose_level, date);
};

exports.getBloodGlucoseByPatientId = async (patient_id) => {
  return bloodGlucoseRepository.getBloodGlucoseByPatientId(patient_id);
};

exports.getBloodGlucose = async (id) => {
  return bloodGlucoseRepository.getBloodGlucose(id);
};

exports.getAllBloodGlucoses = async () => {
  return bloodGlucoseRepository.getAllBloodGlucoses();
};

exports.updateBloodGlucose = async (id, glucose_level, date) => {
  return bloodGlucoseRepository.updateBloodGlucose(id, glucose_level, date);
};

exports.deleteBloodGlucose = async (id) => {
  return bloodGlucoseRepository.deleteBloodGlucose(id);
};
