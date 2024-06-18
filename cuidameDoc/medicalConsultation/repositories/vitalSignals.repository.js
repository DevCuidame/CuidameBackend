const pool = require("../../../utils/connection");
const VitalSignals = require("../model/vitalSignals.model");

exports.createVitalSignals = async (medical_consult_id, weight, size, imc, blood_pressure, heart_frequency, system, body_area, symptom, description) => {
  const query = 'INSERT INTO vitalsignals (medical_consult_id, weight, size, imc, blood_pressure, heart_frequency, system, body_area, symptom, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *';
  const values = [medical_consult_id, weight, size, imc, blood_pressure, heart_frequency, system, body_area, symptom, description];
  const result = await pool.query(query, values);
  const { id } = result.rows[0];
  return new VitalSignals(id, medical_consult_id, weight, size, imc, blood_pressure, heart_frequency, system, body_area, symptom, description);
};

exports.getVitalSignals = async (id) => {
  const query = 'SELECT * FROM vitalsignals WHERE id = $1';
  const result = await pool.query(query, [id]);
  if (!result.rows.length) {
    return null;  
  }
  const { medical_consult_id, weight, size, imc, blood_pressure, heart_frequency, system, body_area, symptom, description } = result.rows[0];
  return new VitalSignals(id, medical_consult_id, weight, size, imc, blood_pressure, heart_frequency, system, body_area, symptom, description);
};

exports.getAllVitalSignals = async () => {
  const query = 'SELECT * FROM vitalsignals';
  const result = await pool.query(query);
  if (!result.rows.length) {
    return null;  
  }
  return result.rows.map(row => {
    const { id, medical_consult_id, weight, size, imc, blood_pressure, heart_frequency, system, body_area, symptom, description } = row;
    return new VitalSignals(id, medical_consult_id, weight, size, imc, blood_pressure, heart_frequency, system, body_area, symptom, description);
  });
};

exports.updateVitalSignals = async (id, medical_consult_id, weight, size, imc, blood_pressure, heart_frequency, system, body_area, symptom, description) => {
  const query = 'UPDATE vitalsignals SET medical_consult_id = $1, weight = $2, size = $3, imc = $4, blood_pressure = $5, heart_frequency = $6, system = $7, body_area = $8, symptom = $9, description = $10 WHERE id = $11 RETURNING *';
  const values = [medical_consult_id, weight, size, imc, blood_pressure, heart_frequency, system, body_area, symptom, description, id];
  const result = await pool.query(query, values);
  return new VitalSignals(id, medical_consult_id, weight, size, imc, blood_pressure, heart_frequency, system, body_area, symptom, description);
};

exports.deleteVitalSignals = async (id) => {
  const query = 'DELETE FROM vitalsignals WHERE id = $1';
  await pool.query(query, [id]);
};
