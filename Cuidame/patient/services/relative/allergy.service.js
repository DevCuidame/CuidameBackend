const allergyRepository = require('../../repositories/relative/allergy.repository');

exports.createAllergy = async (data) => {
  return allergyRepository.createAllergy(data);
};

exports.getAllergy = async (id) => {
  return allergyRepository.getAllergy(id);
};

exports.getAllergyByPaciente = async (id) => {
  return allergyRepository.getAllergyByPaciente(id);
};

exports.getAllAllergies = async () => {
  return allergyRepository.getAllAllergies();
};

exports.updateAllergy = async (id, data) => {
  return allergyRepository.updateAllergy(id, data);
};

exports.deleteAllergy = async (id) => {
  return allergyRepository.deleteAllergy(id);
};
