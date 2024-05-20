const serviceRepository = require('../repositories/service.repository');

exports.createService = async (provider_id, service_id, status) => {
  return serviceRepository.createService(provider_id, service_id, status);
};

exports.getService = async (id) => {
  return serviceRepository.getService(id);
};

exports.getAllServices = async () => {
  return serviceRepository.getAllServices();
};

exports.updateService = async (id, name, providerId, status) => {
  return serviceRepository.updateService(id, name, providerId, status);
};

exports.deleteService = async (id) => {
  return serviceRepository.deleteService(id);
};
