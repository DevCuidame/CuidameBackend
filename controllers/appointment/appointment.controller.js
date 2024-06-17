const appointmentService = require('../../services/appointment/appointment.service');

exports.createAppointment = async (req, res) => {
  try {
    const appointment = await appointmentService.createAppointment(req.body);
    res.status(201).json(appointment);
  } catch (error) {
    res.status(404).json({ error: 'Error al crear la cita' });
  }
};

exports.getAppointment = async (req, res) => {
  try {
    const appointment = await appointmentService.getAppointment(req.params.id);
    res.status(200).json(appointment);
  } catch (error) {
    res.status(404).json({ error: 'Error al obtener la cita' });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const appointment = await appointmentService.updateAppointment(req.params.id, req.body);
    res.status(200).json(appointment);
  } catch (error) {
    res.status(404).json({ error: 'Error al actualizar la cita' });
  }
};

exports.cancelAppointment = async (req, res) => {
  try {
    await appointmentService.cancelAppointment(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: 'Error al cancelar la cita' });
  }
};

exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await appointmentService.getAllAppointments();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(404).json({ error: 'Error al obtener las citas' });
  }
};

exports.getAppointmentsByUser = async (req, res) => {
  try {
    const appointments = await appointmentService.getAppointmentsByUser(req.params.userId);
    res.status(200).json(appointments);
  } catch (error) {
    res.status(404).json({ error: 'Error al obtener las citas del usuario' });
  }
};

exports.getAppointmentsByDoctor = async (req, res) => {
  try {
    const appointments = await appointmentService.getAppointmentsByDoctor(req.params.doctorId);
    res.status(200).json(appointments);
  } catch (error) {
    res.status(404).json({ error: 'Error al obtener las citas del doctor' });
  }
};
