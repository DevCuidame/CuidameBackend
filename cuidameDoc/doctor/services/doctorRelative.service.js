// services/DoctorRelativeService.js
const doctorRelativeRepository = require('../repositories/doctorRelative.repository');

exports.createDoctorRelative = async (doctor_id, relative_id, service_id) => {
  return doctorRelativeRepository.createDoctorRelative(doctor_id, relative_id, service_id);
};

exports.getDoctorRelative = async (id) => {
  return doctorRelativeRepository.getDoctorRelative(id);
};

exports.getAllDoctorRelatives = async () => {
  return doctorRelativeRepository.getAllDoctorRelatives();
};

exports.updateDoctorRelative = async (id, doctor_id, relative_id, service_id) => {
  return doctorRelativeRepository.updateDoctorRelative(id, doctor_id, relative_id, service_id);
};

exports.deleteDoctorRelative = async (id) => {
  return doctorRelativeRepository.deleteDoctorRelative(id);
};
