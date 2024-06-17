const appointmentRepository = require('../../repositories/appointment/appointment.repository');
const calendlyService = require('../../utils/calendly/calendly');

exports.createAppointment = async (data) => {
  const { user_id, doctor_id, start_time, end_time } = data;
  const calendlyEvent = await calendlyService.scheduleEvent(data);
  data.calendly_event_id = calendlyEvent.id;
  data.status = 'scheduled';
  return appointmentRepository.createAppointment(data);
};

exports.getAppointment = async (id) => {
  return appointmentRepository.getAppointment(id);
};

exports.updateAppointment = async (id, data) => {
  return appointmentRepository.updateAppointment(id, data);
};

exports.cancelAppointment = async (id) => {
  const appointment = await appointmentRepository.getAppointment(id);
  if (appointment) {
    await calendlyService.cancelEvent(appointment.calendly_event_id);
    return appointmentRepository.updateAppointment(id, { status: 'cancelled' });
  }
};

exports.getAllAppointments = async () => {
  return appointmentRepository.getAllAppointments();
};

exports.getAppointmentsByUser = async (userId) => {
  return appointmentRepository.getAppointmentsByUser(userId);
};

exports.getAppointmentsByDoctor = async (doctorId) => {
  return appointmentRepository.getAppointmentsByDoctor(doctorId);
};
