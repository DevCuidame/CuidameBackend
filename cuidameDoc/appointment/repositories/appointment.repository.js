const pool = require("../../../utils/connection");
const Appointments = require("../model/appointments.model");

exports.createAppointment = async (user_id, doctor_id, calendly_event_id, start_time, end_time, status) => {
  const query = 'INSERT INTO appointments (user_id, doctor_id, calendly_event_id, start_time, end_time, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  const values = [user_id, doctor_id, calendly_event_id, start_time, end_time, status];
  const result = await pool.query(query, values);
  const { id, created_at, updated_at } = result.rows[0];
  return new Appointments(id, user_id, doctor_id, calendly_event_id, start_time, end_time, status, created_at, updated_at);
};

exports.getAppointment = async (id) => {
  const query = 'SELECT * FROM appointments WHERE id = $1';
  const result = await pool.query(query, [id]);
  if (!result.rows.length) {
    return null;  
  }
  const { user_id, doctor_id, calendly_event_id, start_time, end_time, status, created_at, updated_at } = result.rows[0];
  return new Appointments(id, user_id, doctor_id, calendly_event_id, start_time, end_time, status, created_at, updated_at);
};

exports.getAllAppointments = async () => {
  const query = 'SELECT * FROM appointments';
  const result = await pool.query(query);
  if (!result.rows.length) {
    return null;  
  }
  return result.rows.map(row => {
    const { id, user_id, doctor_id, calendly_event_id, start_time, end_time, status, created_at, updated_at } = row;
    return new Appointments(id, user_id, doctor_id, calendly_event_id, start_time, end_time, status, created_at, updated_at);
  });
};

exports.updateAppointment = async (id, user_id, doctor_id, calendly_event_id, start_time, end_time, status) => {
  const query = 'UPDATE appointments SET user_id = $1, doctor_id = $2, calendly_event_id = $3, start_time = $4, end_time = $5, status = $6, updated_at = NOW() WHERE id = $7 RETURNING *';
  const values = [user_id, doctor_id, calendly_event_id, start_time, end_time, status, id];
  const result = await pool.query(query, values);
  const { created_at, updated_at } = result.rows[0];
  return new Appointments(id, user_id, doctor_id, calendly_event_id, start_time, end_time, status, created_at, updated_at);
};

exports.deleteAppointment = async (id) => {
  const query = 'DELETE FROM appointments WHERE id = $1';
  await pool.query(query, [id]);
};
