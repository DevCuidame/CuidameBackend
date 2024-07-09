const heartRateRepository = require('../repositories/heartRate.repository');

exports.createHeartRate = async (patient_id, rate, date) => {
  return heartRateRepository.createHeartRate(patient_id, rate, date);
};

exports.getHeartRate = async (id) => {
  return heartRateRepository.getHeartRate(id);
};
exports.getHeartRateByPatientId = async (patient_id) => {
  return heartRateRepository.getHeartRateByPatientId(patient_id);
};


exports.getAllHeartRates = async () => {
  return heartRateRepository.getAllHeartRates();
};

exports.updateHeartRate = async (id, rate, date) => {
  return heartRateRepository.updateHeartRate(id, rate, date);
};

exports.deleteHeartRate = async (id) => {
  return heartRateRepository.deleteHeartRate(id);
};
