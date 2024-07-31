const antecedentRepository = require('../../repositories/relative/antecedent.repository');

exports.createAntecedent = async (data) => {
  return antecedentRepository.createAntecedent(data);
};

exports.getAntecedent = async (id) => {
  return antecedentRepository.getAntecedent(id);
};

exports.getAntecedentByRelative = async (id) => {
  return antecedentRepository.getAntecedentByRelative(id);
};

exports.getAllAntecedents = async () => {
  return antecedentRepository.getAllAntecedents();
};

exports.updateAntecedent = async (id, data) => {
  return antecedentRepository.updateAntecedent(id, data);
};

exports.deleteAntecedent = async (id) => {
  return antecedentRepository.deleteAntecedent(id);
};
