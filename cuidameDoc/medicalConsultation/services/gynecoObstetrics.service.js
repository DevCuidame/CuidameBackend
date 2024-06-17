// services/GynecoObstetricsService.js
const gynecoObstetricsRepository = require('../repositories/gynecoObstetrics.repository');

exports.createGynecoObstetrics = async (medical_consult_id, births, abortions, cesarean, gestations, menstrual_cycles, family_planning) => {
  return gynecoObstetricsRepository.createGynecoObstetrics(medical_consult_id, births, abortions, cesarean, gestations, menstrual_cycles, family_planning);
};

exports.getGynecoObstetrics = async (id) => {
  return gynecoObstetricsRepository.getGynecoObstetrics(id);
};

exports.getAllGynecoObstetrics = async () => {
  return gynecoObstetricsRepository.getAllGynecoObstetrics();
};

exports.updateGynecoObstetrics = async (id, medical_consult_id, births, abortions, cesarean, gestations, menstrual_cycles, family_planning) => {
  return gynecoObstetricsRepository.updateGynecoObstetrics(id, medical_consult_id, births, abortions, cesarean, gestations, menstrual_cycles, family_planning);
};

exports.deleteGynecoObstetrics = async (id) => {
  return gynecoObstetricsRepository.deleteGynecoObstetrics(id);
};
