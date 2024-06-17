// services/DoctorService.js
const doctorRepository = require('../repositories/doctor.repository');

exports.createDoctor = async (first_name, last_name, identification_type, identification_number, city_id, address, phone, medical_record, medical_specialist, landline_phone, note, rating) => {
  return doctorRepository.createDoctor(first_name, last_name, identification_type, identification_number, city_id, address, phone, medical_record, medical_specialist, landline_phone, note, rating);
};

exports.getDoctor = async (id) => {
  return doctorRepository.getDoctor(id);
};

exports.getAllDoctors = async () => {
  return doctorRepository.getAllDoctors();
};

exports.updateDoctor = async (id, first_name, last_name, identification_type, identification_number, city_id, address, phone, medical_record, medical_specialist, landline_phone, note, rating) => {
  return doctorRepository.updateDoctor(id, first_name, last_name, identification_type, identification_number, city_id, address, phone, medical_record, medical_specialist, landline_phone, note, rating);
};

exports.deleteDoctor = async (id) => {
  return doctorRepository.deleteDoctor(id);
};
