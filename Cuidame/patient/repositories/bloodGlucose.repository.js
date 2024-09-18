// path: src/repositories/bloodGlucose.repository.js
const pool = require("../../../utils/connection");
const BloodGlucose = require("../models/bloodGlucose.model");

exports.getBloodGlucoseByPatientId = async (patient_id) => {
  const query = 'SELECT * FROM blood_glucose WHERE patient_id = $1';
  const result = await pool.query(query, [patient_id]);
  if (!result.rows.length) {
    return [];
  }
  return result.rows.map(row => new BloodGlucose(row.id, row.patient_id, row.rate, row.date));
};

exports.createBloodGlucose = async (patient_id, rate, date) => {
  const query = 'INSERT INTO blood_glucose (patient_id, rate, date) VALUES ($1, $2, $3) RETURNING *';
  const values = [patient_id, rate, date];
  const result = await pool.query(query, values);
  const { id } = result.rows[0];
  return new BloodGlucose(id, patient_id, rate, date);
};

exports.getBloodGlucose = async (id) => {
  const query = 'SELECT * FROM blood_glucose WHERE id = $1';
  const result = await pool.query(query, [id]);
  if (!result.rows.length) {
    return null;
  }
  const { patient_id, rate, date } = result.rows[0];
  return new BloodGlucose(id, patient_id, rate, date);
};

exports.getAllBloodGlucoses = async () => {
  const query = 'SELECT * FROM blood_glucose';
  const result = await pool.query(query);
  if (!result.rows.length) {
    return null;  
  }
  return result.rows.map(row => {
    const { id, patient_id, rate, date } = row;
    return new BloodGlucose(id, patient_id, rate, date);
  });
};

exports.updateBloodGlucose = async (id, rate, date) => {
  const query = 'UPDATE blood_glucose SET rate = $1, date = $2 WHERE id = $3 RETURNING *';
  const values = [rate, date, id];
  const result = await pool.query(query, values);
  return new BloodGlucose(id, result.rows[0].patient_id, rate, date);
};

exports.deleteBloodGlucose = async (id) => {
  const query = 'DELETE FROM blood_glucose WHERE id = $1';
  const result = await pool.query(query, [id]);
  return result.rowCount > 0;
};
