// path: src/repositories/bloodOxygen.repository.js
const pool = require("../../../utils/connection");
const BloodOxygen = require("../models/bloodOxygen.model");

exports.getBloodOxygenByPatientId = async (patient_id) => {
  const query = 'SELECT * FROM blood_oxygen WHERE patient_id = $1';
  const result = await pool.query(query, [patient_id]);
  if (!result.rows.length) {
    return [];
  }
  return result.rows.map(row => new BloodOxygen(row.id, row.patient_id, row.rate, row.date));
};

exports.createBloodOxygen = async (patient_id, rate, date) => {
  const query = 'INSERT INTO blood_oxygen (patient_id, rate, date) VALUES ($1, $2, $3) RETURNING *';
  const values = [patient_id, rate, date];
  const result = await pool.query(query, values);
  const { id } = result.rows[0];
  return new BloodOxygen(id, patient_id, rate, date);
};

exports.getBloodOxygen = async (id) => {
  const query = 'SELECT * FROM blood_oxygen WHERE id = $1';
  const result = await pool.query(query, [id]);
  if (!result.rows.length) {
    return null;
  }
  const { patient_id, rate, date } = result.rows[0];
  return new BloodOxygen(id, patient_id, rate, date);
};

exports.getAllBloodOxygens = async () => {
  const query = 'SELECT * FROM blood_oxygen';
  const result = await pool.query(query);
  if (!result.rows.length) {
    return null;  
  }
  return result.rows.map(row => {
    const { id, patient_id, rate, date } = row;
    return new BloodOxygen(id, patient_id, rate, date);
  });
};

exports.updateBloodOxygen = async (id, rate, date) => {
  const query = 'UPDATE blood_oxygen SET rate = $1, date = $2 WHERE id = $3 RETURNING *';
  const values = [rate, date, id];
  const result = await pool.query(query, values);
  return new BloodOxygen(id, result.rows[0].patient_id, rate, date);
};

exports.deleteBloodOxygen = async (id) => {
  const query = 'DELETE FROM blood_oxygen WHERE id = $1';
  const result = await pool.query(query, [id]);
  return result.rowCount > 0;
};
