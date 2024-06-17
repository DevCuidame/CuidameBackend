const relativeRepository = require('../repositories/relative.repository');

exports.createRelative = async ( user_id, doctor_id, first_name, last_name, identification_type, identification_number, age, gender, marital_status, place_of_birth, city_id, address, phone, occupation, position, health_insurance_id, company_id, status ) => {
  return relativeRepository.createRelative( user_id, doctor_id, first_name, last_name, identification_type, identification_number, age, gender, marital_status, place_of_birth, city_id, address, phone, occupation, position, health_insurance_id, company_id, status );
};

exports.getRelative = async (id) => {
  return relativeRepository.getRelative(id);
};

exports.updateRelative = async ( id, user_id, doctor_id, first_name, last_name, identification_type, identification_number, age, gender, marital_status, place_of_birth, city_id, address, phone, occupation, position, health_insurance_id, company_id, status ) => {
  return relativeRepository.updateRelative( id, user_id, doctor_id, first_name, last_name, identification_type, identification_number, age, gender, marital_status, place_of_birth, city_id, address, phone, occupation, position, health_insurance_id, company_id, status );
};

exports.deleteRelative = async (id) => {
  return relativeRepository.deleteRelative(id);
};

exports.getAllRelatives = async () => {
  return relativeRepository.getAllRelatives();
};
