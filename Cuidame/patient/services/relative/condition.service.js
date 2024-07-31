const conditionRepository = require('../../repositories/relative/condition.repository');

exports.createCondition = async (data) => {
  return conditionRepository.createCondition(data);
};

exports.getCondition = async (id) => {
  return conditionRepository.getCondition(id);
};

exports.getConditionByRelative = async (id) => {
  return conditionRepository.getConditionByRelative(id);
};

exports.getAllConditions = async () => {
  return conditionRepository.getAllConditions();
};

exports.updateCondition = async (id, data) => {
  return conditionRepository.updateCondition(id, data);
};

exports.deleteCondition = async (id) => {
  return conditionRepository.deleteCondition(id);
};
