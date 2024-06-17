// services/DoctorServiceService.js
const doctorServiceRepository = require('../repositories/doctorService.repository');

exports.createDoctorService = async (name, visit_price, doctor_id, discount) => {
  return doctorServiceRepository.createDoctorService(name, visit_price, doctor_id, discount);
};

exports.getDoctorService = async (id) => {
  return doctorServiceRepository.getDoctorService(id);
};

exports.getAllDoctorServices = async () => {
  return doctorServiceRepository.getAllDoctorServices();
};

exports.updateDoctorService = async (id, name, visit_price, doctor_id, discount) => {
  return doctorServiceRepository.updateDoctorService(id, name, visit_price, doctor_id, discount);
};

exports.deleteDoctorService = async (id) => {
  return doctorServiceRepository.deleteDoctorService(id);
};
