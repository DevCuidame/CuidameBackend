const relativeRepository = require("../../repositories/relative/relative.repository");

exports.createRelative = async (data) => {
  return relativeRepository.createRelative(data);
};

exports.getRelative = async (id) => {
  return relativeRepository.getRelative(id);
};

exports.getAllRelatives = async () => {
  return relativeRepository.getAllRelatives();
};

exports.updateRelative = async (id, data) => {
  return relativeRepository.updateRelative(id, data);
};

exports.deleteRelative = async (id) => {
  return relativeRepository.deleteRelative(id);
};
