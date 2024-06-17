// services/AppointmentService.js
const appointmentRepository = require('../repositories/appointment.repository');

exports.createAppointment = async (user_id, doctor_id, calendly_event_id, start_time, end_time, status) => {
  return appointmentRepository.createAppointment(user_id, doctor_id, calendly_event_id, start_time, end_time, status);
};

exports.getAppointment = async (id) => {
  return appointmentRepository.getAppointment(id);
};

exports.getAllAppointments = async () => {
  return appointmentRepository.getAllAppointments();
};

exports.updateAppointment = async (id, user_id, doctor_id, calendly_event_id, start_time, end_time, status) => {
  return appointmentRepository.updateAppointment(id, user_id, doctor_id, calendly_event_id, start_time, end_time, status);
};

exports.deleteAppointment = async (id) => {
  return appointmentRepository.deleteAppointment(id);
};
