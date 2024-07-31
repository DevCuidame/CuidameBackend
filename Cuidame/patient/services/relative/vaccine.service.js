const vaccineRepository = require("../../repositories/relative/vaccine.repository");

exports.createVaccine = async (data) => {
  return vaccineRepository.createVaccine(data);
};

exports.getVaccine = async (id) => {
  return vaccineRepository.getVaccine(id);
};

exports.getVaccineByRelative = async (id) => {
  return vaccineRepository.getVaccineByRelative(id);
};

exports.getAllVaccines = async () => {
  return vaccineRepository.getAllVaccines();
};

exports.updateVaccine = async (id, data) => {
  return vaccineRepository.updateVaccine(id, data);
};

exports.deleteVaccine = async (id) => {
  return vaccineRepository.deleteVaccine(id);
};
