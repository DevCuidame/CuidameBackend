// services/FamiliarRecordsService.js
const familiarRecordsRepository = require('../repositories/familarRecords.repository');

exports.createFamiliarRecord = async (medical_consult_id, relative, diagnostic, records, hemorrhagic, thrombotic, oncological) => {
  return familiarRecordsRepository.createFamiliarRecord(medical_consult_id, relative, diagnostic, records, hemorrhagic, thrombotic, oncological);
};

exports.getFamiliarRecord = async (id) => {
  return familiarRecordsRepository.getFamiliarRecord(id);
};

exports.getAllFamiliarRecords = async () => {
  return familiarRecordsRepository.getAllFamiliarRecords();
};

exports.getFamiliarRecordByConsult = async () => {
  return familiarRecordsRepository.getFamiliarRecordByConsult();
};


exports.updateFamiliarRecord = async (id, medical_consult_id, relative, diagnostic, records, hemorrhagic, thrombotic, oncological) => {
  return familiarRecordsRepository.updateFamiliarRecord(id, medical_consult_id, relative, diagnostic, records, hemorrhagic, thrombotic, oncological);
};

exports.deleteFamiliarRecord = async (id) => {
  return familiarRecordsRepository.deleteFamiliarRecord(id);
};
