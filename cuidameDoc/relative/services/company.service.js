const companyRepository = require('../repositories/company.repository');

exports.createCompany = async (data) => {
  const { name, address, nit, phone, contact, city_id } = data;
  return companyRepository.createCompany(name, address, nit, phone, contact, city_id);
};

exports.getCompany = async (id) => {
  return companyRepository.getCompany(id);
};


exports.getCompanyByNit = async (id) => {
  return companyRepository.getCompanyByNit(id);
};

exports.updateCompany = async (id, data) => {
  const { name, address, nit, phone, contact, city_id } = data;
  return companyRepository.updateCompany(id, name, address, nit, phone, contact, city_id);
};

exports.deleteCompany = async (id) => {
  return companyRepository.deleteCompany(id);
};

exports.getAllCompanies = async () => {
  return companyRepository.getAllCompanies();
};
