const appointmentService = require("../services/appointment.service");

exports.createAppointment = async (req, res) => {
  const { user_id, doctor_id, calendly_event_id, start_time, end_time, status } = req.body;

  try {
    const appointment = await appointmentService.createAppointment(user_id, doctor_id, calendly_event_id, start_time, end_time, status);
    res.json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    const appointment = await appointmentService.getAppointment(id);

    if (!appointment) {
      res.status(404).json({ error: "Cita no encontrada" });
      return;
    }

    res.json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await appointmentService.getAllAppointments();
    res.json(appointments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateAppointment = async (req, res) => {
  const { id } = req.params;
  const { user_id, doctor_id, calendly_event_id, start_time, end_time, status } = req.body;

  try {
    const appointment = await appointmentService.updateAppointment(id, user_id, doctor_id, calendly_event_id, start_time, end_time, status);

    if (!appointment) {
      res.status(404).json({ error: "Cita no encontrada para actualizar" });
      return;
    }

    res.json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    const appointment = await appointmentService.deleteAppointment(id);

    if (!appointment) {
      res.status(404).json({ error: "Cita no encontrada para eliminar" });
      return;
    }

    res.json({ message: "Cita eliminada correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
