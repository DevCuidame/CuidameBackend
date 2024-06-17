const siteRepository = require('../repositories/sites.repository');

exports.createSite = async (address, phone, contact, city_id, company_id) => {
  return siteRepository.createSite(address, phone, contact, city_id, company_id);
};

exports.getSite = async (id) => {
  return siteRepository.getSite(id);
};

exports.updateSite = async (id, address, phone, contact, city_id, company_id) => {
  return siteRepository.updateSite(id, address, phone, contact, city_id, company_id);
};

exports.deleteSite = async (id) => {
  return siteRepository.deleteSite(id);
};

exports.getAllSites = async () => {
  return siteRepository.getAllSites();
};
