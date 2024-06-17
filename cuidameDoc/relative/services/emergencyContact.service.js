const emergencyContactRepository = require('../repositories/emergencyContact.repository');

exports.createEmergencyContact = async (relative_id, first_name, last_name, phone) => {
  return emergencyContactRepository.createEmergencyContact(relative_id, first_name, last_name, phone);
};

exports.getEmergencyContact = async (id) => {
  return emergencyContactRepository.getEmergencyContact(id);
};

exports.updateEmergencyContact = async (id, relative_id, first_name, last_name, phone) => {
  return emergencyContactRepository.updateEmergencyContact(id, relative_id, first_name, last_name, phone);
};

exports.deleteEmergencyContact = async (id) => {
  return emergencyContactRepository.deleteEmergencyContact(id);
};

exports.getAllEmergencyContacts = async () => {
  return emergencyContactRepository.getAllEmergencyContacts();
};
