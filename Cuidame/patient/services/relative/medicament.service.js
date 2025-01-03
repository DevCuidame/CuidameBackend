const medicamentRepository = require('../../repositories/relative/medicament.repository');

exports.createMedicament = async (data) => {
  return medicamentRepository.createMedicament(data);
};

exports.getMedicament = async (id) => {
  return medicamentRepository.getMedicament(id);
};

exports.getMedicamentByRelative = async (id) => {
  return medicamentRepository.getMedicamentByRelative(id);
};

exports.getAllMedicaments = async () => {
  return medicamentRepository.getAllMedicaments();
};

exports.updateMedicament = async (id, data) => {
  return medicamentRepository.updateMedicament(id, data);
};

exports.deleteMedicament = async (id) => {
  return medicamentRepository.deleteMedicament(id);
};
