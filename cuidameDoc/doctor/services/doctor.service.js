// services/DoctorService.js
const doctorRepository = require('../repositories/doctor.repository');

exports.createDoctor = async (first_name, last_name, identification_type, identification_number, city_id, address, phone, medical_record, medical_specialist, landline_phone, note, rating, pub_name, priv_name, file_bs64) => {
  return doctorRepository.createDoctor(first_name, last_name, identification_type, identification_number, city_id, address, phone, medical_record, medical_specialist, landline_phone, note, rating, pub_name, priv_name, file_bs64);
};

exports.getDoctor = async (id) => {
  return doctorRepository.getDoctor(id);
};

exports.getDoctorByCard = async (identification_number) => {
  return doctorRepository.getDoctorByCard(identification_number);
};

exports.getAllDoctors = async () => {
  return doctorRepository.getAllDoctors();
};

exports.updateDoctor = async (id, first_name, last_name, identification_type, identification_number, city_id, address, phone, medical_record, medical_specialist, landline_phone, note, rating, pub_name, priv_name, file_bs64) => {
  return doctorRepository.updateDoctor(id, first_name, last_name, identification_type, identification_number, city_id, address, phone, medical_record, medical_specialist, landline_phone, note, rating, pub_name, priv_name, file_bs64);
};

exports.deleteDoctor = async (id) => {
  return doctorRepository.deleteDoctor(id);
};
