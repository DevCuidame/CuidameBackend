// services/RegimentTypeService.js
const regimentTypeRepository = require('../repositories/regimentType.repository');

exports.createRegimentType = async (health_insurance_id, regiment_type, category, max_value_event) => {
  return regimentTypeRepository.createRegimentType(health_insurance_id, regiment_type, category, max_value_event);
};

exports.getRegimentType = async (id) => {
  return regimentTypeRepository.getRegimentType(id);
};

exports.getAllRegimentTypes = async () => {
  return regimentTypeRepository.getAllRegimentTypes();
};

exports.updateRegimentType = async (id, health_insurance_id, regiment_type, category, max_value_event) => {
  return regimentTypeRepository.updateRegimentType(id, health_insurance_id, regiment_type, category, max_value_event);
};

exports.deleteRegimentType = async (id) => {
  return regimentTypeRepository.deleteRegimentType(id);
};
