// controllers/ReminderController.js
const reminderService = require("../../services/relative/reminder.service");

exports.createReminder = async (req, res) => {
  try {
    const data = req.body;
    const newReminder = await reminderService.createReminder(
      data.medication_id,
      data.reminder_datetime,
      data.message
    );

    return res.status(200).json({
      message: "Recordatorio creado correctamente",
      newReminder,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error al crear el recordatorio",
      error: error.message,
      success: false,
    });
  }
};


exports.getReminder = async (req, res) => {
  try {
    const id = req.params.id;
    const reminder = await reminderService.getReminder(id);

    if (!reminder) {
      return res
        .status(404)
        .json({ error: "Recordatorio no encontrado", success: false });
    }

    return res.status(200).json({ reminder, success: true });
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};

exports.getAllReminders = async (req, res) => {
  try {
    const reminders = await reminderService.getAllReminders();
    return res.status(200).json({ reminders, success: true });
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};

exports.updateReminder = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const updatedReminder = await reminderService.updateReminder(
      id,
      data.medication_id,
      data.reminder_datetime,
      data.message
    );

    return res.status(200).json({
      message: "Recordatorio actualizado correctamente",
      updatedReminder,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error al actualizar el recordatorio",
      error: error.message,
      success: false,
    });
  }
};

exports.deleteReminder = async (req, res) => {
  try {
    const id = req.params.id;
    await reminderService.deleteReminder(id);

    return res
      .status(200)
      .json({ message: "Recordatorio eliminado correctamente", success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message, success: false });
  }
};


