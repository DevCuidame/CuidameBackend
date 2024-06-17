// services/DiagnosticService.js
const diagnosticRepository = require('../repositories/diagnostic.repository');

exports.createDiagnostic = async (medical_consult_id, diagnostic, epicrisis) => {
  return diagnosticRepository.createDiagnostic(medical_consult_id, diagnostic, epicrisis);
};

exports.getDiagnostic = async (id) => {
  return diagnosticRepository.getDiagnostic(id);
};

exports.getAllDiagnostics = async () => {
  return diagnosticRepository.getAllDiagnostics();
};

exports.updateDiagnostic = async (id, medical_consult_id, diagnostic, epicrisis) => {
  return diagnosticRepository.updateDiagnostic(id, medical_consult_id, diagnostic, epicrisis);
};

exports.deleteDiagnostic = async (id) => {
  return diagnosticRepository.deleteDiagnostic(id);
};
