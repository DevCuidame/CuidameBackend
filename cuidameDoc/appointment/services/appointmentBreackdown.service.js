// services/AppointmentBreakdownService.js
const appointmentBreakdownRepository = require('../repositories/appointmentBreakdown.repository');

exports.createAppointmentBreakdown = async (user_id, doctor_id, appointment_id) => {
  return appointmentBreakdownRepository.createAppointmentBreakdown(user_id, doctor_id, appointment_id);
};

exports.getAppointmentBreakdown = async (id) => {
  return appointmentBreakdownRepository.getAppointmentBreakdown(id);
};

exports.getAllAppointmentBreakdowns = async () => {
  return appointmentBreakdownRepository.getAllAppointmentBreakdowns();
};

exports.updateAppointmentBreakdown = async (id, user_id, doctor_id, appointment_id) => {
  return appointmentBreakdownRepository.updateAppointmentBreakdown(id, user_id, doctor_id, appointment_id);
};

exports.deleteAppointmentBreakdown = async (id) => {
  return appointmentBreakdownRepository.deleteAppointmentBreakdown(id);
};
