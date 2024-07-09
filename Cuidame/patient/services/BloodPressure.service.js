const bloodPressureRepository = require('../repositories/bloodPressure.repository');

exports.createBloodPressure = async (patient_id, systolic, diastolic, date) => {
  return bloodPressureRepository.createBloodPressure(patient_id, systolic, diastolic, date);
};

exports.getBloodPressureByPatientId = async (patient_id) => {
  return bloodPressureRepository.getBloodPressureByPatientId(patient_id);
};


exports.getBloodPressure = async (id) => {
  return bloodPressureRepository.getBloodPressure(id);
};

exports.getAllBloodPressures = async () => {
  return bloodPressureRepository.getAllBloodPressures();
};

exports.updateBloodPressure = async (id, systolic, diastolic, date) => {
  return bloodPressureRepository.updateBloodPressure(id, systolic, diastolic, date);
};

exports.deleteBloodPressure = async (id) => {
  return bloodPressureRepository.deleteBloodPressure(id);
};
