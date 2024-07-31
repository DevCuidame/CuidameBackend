const diseaseRepository = require('../../repositories/relative/disease.repository');

exports.createDisease = async (data) => {
  return diseaseRepository.createDisease(data);
};

exports.getDisease = async (id) => {
  return diseaseRepository.getDisease(id);
};

exports.getDiseaseByRelative = async (id) => {
  return diseaseRepository.getDiseaseByRelative(id);
};

exports.getAllDiseases = async () => {
  return diseaseRepository.getAllDiseases();
};

exports.updateDisease = async (id, data) => {
  return diseaseRepository.updateDisease(id, data);
};

exports.deleteDisease = async (id) => {
  return diseaseRepository.deleteDisease(id);
};
