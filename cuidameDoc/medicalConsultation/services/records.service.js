// services/RecordsService.js
const recordsRepository = require('../repositories/records.repository');

exports.createRecord = async (medical_consult_id, type, date, description) => {
  return recordsRepository.createRecord(medical_consult_id, type, date, description);
};

exports.getRecord = async (id) => {
  return recordsRepository.getRecord(id);
};

exports.getAllRecords = async () => {
  return recordsRepository.getAllRecords();
};

exports.updateRecord = async (id, medical_consult_id, type, date, description) => {
  return recordsRepository.updateRecord(id, medical_consult_id, type, date, description);
};

exports.deleteRecord = async (id) => {
  return recordsRepository.deleteRecord(id);
};
