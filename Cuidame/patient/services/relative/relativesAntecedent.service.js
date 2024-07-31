const relativeAntecedentRepository = require("../../repositories/relative/relativesAntecedent.repository");

exports.createRelativeAntecedent = async (data) => {
  return relativeAntecedentRepository.createRelativeAntecedent(data);
};

exports.getRelativeAntecedent = async (id) => {
  return relativeAntecedentRepository.getRelativeAntecedent(id);
};

exports.getRelativeAntecedentByRelative = async (id) => {
  return relativeAntecedentRepository.getRelativeAntecedentByRelative(id);
};

exports.getAllRelativeAntecedents = async () => {
  return relativeAntecedentRepository.getAllRelativeAntecedents();
};

exports.updateRelativeAntecedent = async (id, data) => {
  return relativeAntecedentRepository.updateRelativeAntecedent(id, data);
};

exports.deleteRelativeAntecedent = async (id) => {
  return relativeAntecedentRepository.deleteRelativeAntecedent(id);
};
