// services/ModeratorFeeService.js
const moderatorFeeRepository = require('../repositories/moderatorFee.repository');

exports.createModeratorFee = async (health_insurance_id, name, price, income_range, category, copayment) => {
  return moderatorFeeRepository.createModeratorFee(health_insurance_id, name, price, income_range, category, copayment);
};

exports.getModeratorFee = async (id) => {
  return moderatorFeeRepository.getModeratorFee(id);
};

exports.getAllModeratorFees = async () => {
  return moderatorFeeRepository.getAllModeratorFees();
};

exports.updateModeratorFee = async (id, health_insurance_id, name, price, income_range, category, copayment) => {
  return moderatorFeeRepository.updateModeratorFee(id, health_insurance_id, name, price, income_range, category, copayment);
};

exports.deleteModeratorFee = async (id) => {
  return moderatorFeeRepository.deleteModeratorFee(id);
};
