const serviceRepository = require('../repositories/service.repository');

exports.createService = async (name, providerId, active) => {
  return serviceRepository.createService(name, providerId, active);
};

exports.getService = async (id) => {
  return serviceRepository.getService(id);
};

exports.updateService = async (id, name, providerId, active) => {
  return serviceRepository.updateService(id, name, providerId, active);
};

exports.deleteService = async (id) => {
  return serviceRepository.deleteService(id);
};
