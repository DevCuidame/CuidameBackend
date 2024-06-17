const pool = require('../../utils/connection');

exports.createAppointment = async (data) => {
  const { user_id, doctor_id, calendly_event_id, start_time, end_time, status } = data;
  const query = `INSERT INTO appointments (user_id, doctor_id, calendly_event_id, start_time, end_time, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
  const values = [user_id, doctor_id, calendly_event_id, start_time, end_time, status];
  const result = await pool.query(query, values);
  return result.rows[0];
};

exports.getAppointment = async (id) => {
  const query = `SELECT * FROM appointments WHERE id = $1`;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

exports.updateAppointment = async (id, data) => {
  const { calendly_event_id, start_time, end_time, status } = data;
  const query = `UPDATE appointments SET calendly_event_id = $1, start_time = $2, end_time = $3, status = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *`;
  const values = [calendly_event_id, start_time, end_time, status, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

exports.getAllAppointments = async () => {
  const query = `SELECT * FROM appointments`;
  const result = await pool.query(query);
  return result.rows;
};

exports.getAppointmentsByUser = async (userId) => {
  const query = `SELECT * FROM appointments WHERE user_id = $1`;
  const result = await pool.query(query, [userId]);
  return result.rows;
};

exports.getAppointmentsByDoctor = async (doctorId) => {
  const query = `SELECT * FROM appointments WHERE doctor_id = $1`;
  const result = await pool.query(query, [doctorId]);
  return result.rows;
};
