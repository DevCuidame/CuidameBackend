const pool = require("../../../utils/connection");
const HeartRate = require("../models/heartRate.model");


exports.getHeartRateByPatientId = async (patient_id) => {
  const query = 'SELECT * FROM heart_rate WHERE patient_id = $1';
  const result = await pool.query(query, [patient_id]);
  if (!result.rows.length) {
    return [];
  }
  return result.rows.map(row => new HeartRate(row.id, row.patient_id, row.rate, row.date, row.created_at));
};


exports.createHeartRate = async (patient_id, rate, date) => {
  const query = 'INSERT INTO heart_rate (patient_id, rate, date) VALUES ($1, $2, $3) RETURNING *';
  const values = [patient_id, rate, date];
  const result = await pool.query(query, values);
  const { id } = result.rows[0];
  return new HeartRate(id, patient_id, rate, date);
};

exports.getHeartRate = async (id) => {
  const query = 'SELECT * FROM heart_rate WHERE id = $1';
  const result = await pool.query(query, [id]);
  if (!result.rows.length) {
    return null;
  }
  const { patient_id, rate, date } = result.rows[0];
  return new HeartRate(id, patient_id, rate, date);
};

exports.getAllHeartRates = async () => {
  const query = 'SELECT * FROM heart_rate';
  const result = await pool.query(query);
  if (!result.rows.length) {
    return null;  
  }
  return result.rows.map(row => {
    const { id, patient_id, rate, date } = row;
    return new HeartRate(id, patient_id, rate, date);
  });
};

exports.updateHeartRate = async (id, rate, date) => {
  const query = 'UPDATE heart_rate SET rate = $1, date = $2 WHERE id = $3 RETURNING *';
  const values = [rate, date, id];
  const result = await pool.query(query, values);
  return new HeartRate(id, result.rows[0].patient_id, rate, date);
};

exports.deleteHeartRate = async (id) => {
  const query = 'DELETE FROM heart_rate WHERE id = $1';
  const result = await pool.query(query, [id]);
  return result.rowCount > 0;
};
