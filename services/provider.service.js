// services/ProviderService.js
const providerRepository = require('../repositories/provider.repository');

exports.createProvider = async (data) => {
  return providerRepository.createProvider(data);
};

exports.getProvider = async (id) => {
  return providerRepository.getProvider(id);
};

exports.getProviderByEmail = async (email) => {
  return providerRepository.getProviderByEmail(email);
};

exports.getProviderByCardId = async (id) => {
  return providerRepository.getProviderByCardId(id);
};

exports.updateProvider = async (id, data) => {
  return providerRepository.updateProvider(id, data);
};

exports.deleteProvider = async (id) => {
  return providerRepository.deleteProvider(id);
};
