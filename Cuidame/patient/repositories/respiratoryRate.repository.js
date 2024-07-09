const pool = require("../../../utils/connection");
const RespiratoryRate = require("../models/RespiratoryRate.model");


exports.getRespiratoryRateByPatientId = async (patient_id) => {
  const query = 'SELECT * FROM respiratory_rate WHERE patient_id = $1';
  const result = await pool.query(query, [patient_id]);
  if (!result.rows.length) {
    return [];
  }
  return result.rows.map(row => new RespiratoryRate(row.id, row.patient_id, row.rate, row.date, row.created_at));
};

exports.createRespiratoryRate = async (patient_id, rate, date) => {
  const query = 'INSERT INTO respiratory_rate (patient_id, rate, date) VALUES ($1, $2, $3) RETURNING *';
  const values = [patient_id, rate, date];
  const result = await pool.query(query, values);
  const { id } = result.rows[0];
  return new RespiratoryRate(id, patient_id, rate, date);
};

exports.getRespiratoryRate = async (id) => {
  const query = 'SELECT * FROM respiratory_rate WHERE id = $1';
  const result = await pool.query(query, [id]);
  if (!result.rows.length) {
    return null;
  }
  const { patient_id, rate, date } = result.rows[0];
  return new RespiratoryRate(id, patient_id, rate, date);
};

exports.getAllRespiratoryRates = async () => {
  const query = 'SELECT * FROM respiratory_rate';
  const result = await pool.query(query);
  if (!result.rows.length) {
    return null;  
  }
  return result.rows.map(row => {
    const { id, patient_id, rate, date } = row;
    return new RespiratoryRate(id, patient_id, rate, date);
  });
};

exports.updateRespiratoryRate = async (id, rate, date) => {
  const query = 'UPDATE respiratory_rate SET rate = $1, date = $2 WHERE id = $3 RETURNING *';
  const values = [rate, date, id];
  const result = await pool.query(query, values);
  return new RespiratoryRate(id, result.rows[0].patient_id, rate, date);
};

exports.deleteRespiratoryRate = async (id) => {
  const query = 'DELETE FROM respiratory_rate WHERE id = $1';
  const result = await pool.query(query, [id]);
  return result.rowCount > 0;
};
