const pool = require("../../../utils/connection");
const AppointmentBreakdown = require("../model/appointmentBreakdown.model");

exports.createAppointmentBreakdown = async (user_id, doctor_id, appointment_id) => {
  const query = 'INSERT INTO appointment_breakdowns (user_id, doctor_id, appointment_id) VALUES ($1, $2, $3) RETURNING *';
  const values = [user_id, doctor_id, appointment_id];
  const result = await pool.query(query, values);
  const { id } = result.rows[0];
  return new AppointmentBreakdown(id, user_id, doctor_id, appointment_id);
};

exports.getAppointmentBreakdown = async (id) => {
  const query = 'SELECT * FROM appointment_breakdowns WHERE id = $1';
  const result = await pool.query(query, [id]);
  const { user_id, doctor_id, appointment_id } = result.rows[0];
  return new AppointmentBreakdown(id, user_id, doctor_id, appointment_id);
};

exports.getAllAppointmentBreakdowns = async () => {
  const query = 'SELECT * FROM appointment_breakdowns';
  const result = await pool.query(query);
  return result.rows.map(row => {
    const { id, user_id, doctor_id, appointment_id } = row;
    return new AppointmentBreakdown(id, user_id, doctor_id, appointment_id);
  });
};

exports.updateAppointmentBreakdown = async (id, user_id, doctor_id, appointment_id) => {
  const query = 'UPDATE appointment_breakdowns SET user_id = $1, doctor_id = $2, appointment_id = $3 WHERE id = $4 RETURNING *';
  const values = [user_id, doctor_id, appointment_id, id];
  const result = await pool.query(query, values);
  const { user_id: updatedUserId, doctor_id: updatedDoctorId, appointment_id: updatedAppointmentId } = result.rows[0];
  return new AppointmentBreakdown(id, updatedUserId, updatedDoctorId, updatedAppointmentId);
};

exports.deleteAppointmentBreakdown = async (id) => {
  const query = 'DELETE FROM appointment_breakdowns WHERE id = $1';
  await pool.query(query, [id]);
};
