const pool = require("../../../../utils/connection");
const Reminder = require("../../models/relative/reminder.model");

exports.createReminder = async () => {
  const { medication_id, reminder_datetime, message } = data;
  const query = `INSERT INTO reminders (medication_id, reminder_datetime, message) 
                 VALUES ($1, $2, $3) RETURNING *`;
  const values = [medication_id, reminder_datetime, message];
  const result = await pool.query(query, values);
  const { id } = result.rows[0];
  return new Reminder(id, medication_id, reminder_datetime, message);
};

exports.getReminder = async (id) => {
  const query = "SELECT * FROM reminders WHERE id = $1";
  const result = await pool.query(query, [id]);
  if (!result.rows.length) {
    return null;
  }
  return new Reminder(...Object.values(result.rows[0]));
};

exports.getAllReminders = async () => {
  const query = "SELECT * FROM reminders";
  const result = await pool.query(query);
  if (!result.rows.length) {
    return null;
  }
  return result.rows.map((row) => new Reminder(...Object.values(row)));
};

exports.updateReminder = async (id, data) => {
  const { medication_id, reminder_datetime, message } = data;
  const query = `UPDATE reminders SET medication_id = $1, reminder_datetime = $2, message = $3 
                 WHERE id = $4 RETURNING *`;
  const values = [medication_id, reminder_datetime, message, id];
  const result = await pool.query(query, values);
  return new Reminder(...Object.values(result.rows[0]));
};

exports.deleteReminder = async (id) => {
  const selectQuery = "SELECT * FROM reminders WHERE id = $1";
  const deleteQuery = "DELETE FROM reminders WHERE id = $1";

  try {
    const selectResult = await pool.query(selectQuery, [id]);
    if (!selectResult.rows.length) {
      return false;
    }

    await pool.query(deleteQuery, [id]);
    return true;
  } catch (error) {
    console.error("Error al eliminar recordatorio:", error);
    throw error;
  }
};
