const appointmentBreakdownService = require("../services/appointmentBreackdown.service");

exports.createAppointmentBreakdown = async (req, res) => {
  const { user_id, doctor_id, appointment_id } = req.body;

  try {
    const breakdown = await appointmentBreakdownService.createAppointmentBreakdown(user_id, doctor_id, appointment_id);
    res.json(breakdown);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAppointmentBreakdown = async (req, res) => {
  const { id } = req.params;

  try {
    const breakdown = await appointmentBreakdownService.getAppointmentBreakdown(id);

    if (!breakdown) {
      res.status(404).json({ error: "Detalle de cita no encontrado" });
      return;
    }

    res.json(breakdown);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllAppointmentBreakdowns = async (req, res) => {
  try {
    const breakdowns = await appointmentBreakdownService.getAllAppointmentBreakdowns();
    res.json(breakdowns);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateAppointmentBreakdown = async (req, res) => {
  const { id } = req.params;
  const { user_id, doctor_id, appointment_id } = req.body;

  try {
    const breakdown = await appointmentBreakdownService.updateAppointmentBreakdown(id, user_id, doctor_id, appointment_id);

    if (!breakdown) {
      res.status(404).json({ error: "Detalle de cita no encontrado para actualizar" });
      return;
    }

    res.json(breakdown);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteAppointmentBreakdown = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await appointmentBreakdownService.deleteAppointmentBreakdown(id);

    if (!result) {
      res.status(404).json({ error: "Detalle de cita no encontrado para eliminar" });
      return;
    }

    res.json({ message: "Detalle de cita eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
