// services/BondsService.js
const bondsRepository = require('../repositories/bonds.repository');

exports.createBond = async (health_insurance_id, name, price) => {
  return bondsRepository.createBond(health_insurance_id, name, price);
};

exports.getBond = async (id) => {
  return bondsRepository.getBond(id);
};

exports.getAllBonds = async () => {
  return bondsRepository.getAllBonds();
};

exports.updateBond = async (id, health_insurance_id, name, price) => {
  return bondsRepository.updateBond(id, health_insurance_id, name, price);
};

exports.deleteBond = async (id) => {
  return bondsRepository.deleteBond(id);
};
