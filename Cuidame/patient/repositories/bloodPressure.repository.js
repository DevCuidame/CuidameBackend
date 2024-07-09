const pool = require("../../../utils/connection");
const BloodPressure = require("../models/bloodPressure.model");


exports.getBloodPressureByPatientId = async (patient_id) => {
  const query = 'SELECT * FROM blood_pressure WHERE patient_id = $1';
  const result = await pool.query(query, [patient_id]);
  if (!result.rows.length) {
    return [];
  }
  return result.rows.map(row => new BloodPressure(row.id, row.patient_id, row.systolic, row.diastolic, row.date, row.created_at));
};


exports.createBloodPressure = async (patient_id, systolic, diastolic, date) => {
  const query = 'INSERT INTO blood_pressure (patient_id, systolic, diastolic, date) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [patient_id, systolic, diastolic, date];
  const result = await pool.query(query, values);
  const { id } = result.rows[0];
  return new BloodPressure(id, patient_id, systolic, diastolic, date);
};

exports.getBloodPressure = async (id) => {
  const query = 'SELECT * FROM blood_pressure WHERE id = $1';
  const result = await pool.query(query, [id]);
  if (!result.rows.length) {
    return null;
  }
  const { patient_id, systolic, diastolic, date } = result.rows[0];
  return new BloodPressure(id, patient_id, systolic, diastolic, date);
};

exports.getAllBloodPressures = async () => {
  const query = 'SELECT * FROM blood_pressure';
  const result = await pool.query(query);
  if (!result.rows.length) {
    return null;  
  }
  return result.rows.map(row => {
    const { id, patient_id, systolic, diastolic, date } = row;
    return new BloodPressure(id, patient_id, systolic, diastolic, date);
  });
};

exports.updateBloodPressure = async (id, systolic, diastolic, date) => {
  const query = 'UPDATE blood_pressure SET systolic = $1, diastolic = $2, date = $3 WHERE id = $4 RETURNING *';
  const values = [systolic, diastolic, date, id];
  const result = await pool.query(query, values);
  return new BloodPressure(id, result.rows[0].patient_id, systolic, diastolic, date);
};

exports.deleteBloodPressure = async (id) => {
  const query = 'DELETE FROM blood_pressure WHERE id = $1';
  const result = await pool.query(query, [id]);
  return result.rowCount > 0;
};
