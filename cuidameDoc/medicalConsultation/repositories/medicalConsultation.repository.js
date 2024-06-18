const pool = require("../../../utils/connection");
const MedicalConsultation = require("../model/medicalConsultation.model");

exports.createMedicalConsultation = async (relative_id, type, city_id, date, reason) => {
  const query = 'INSERT INTO medical_consultations (relative_id, type, city_id, date, reason) VALUES ($1, $2, $3, $4, $5) RETURNING *';
  const values = [relative_id, type, city_id, date, reason];
  const result = await pool.query(query, values);
  const { id } = result.rows[0];
  return new MedicalConsultation(id, relative_id, type, city_id, date, reason);
};

exports.getMedicalConsultation = async (id) => {
  const query = 'SELECT * FROM medical_consultations WHERE id = $1';
  const result = await pool.query(query, [id]);
  const { relative_id, type, city_id, date, reason } = result.rows[0];
  return new MedicalConsultation(id, relative_id, type, city_id, date, reason);
};

exports.getAllMedicalConsultations = async () => {
  const query = 'SELECT * FROM medical_consultations';
  const result = await pool.query(query);
  return result.rows.map(row => {
    const { id, relative_id, type, city_id, date, reason } = row;
    return new MedicalConsultation(id, relative_id, type, city_id, date, reason);
  });
};

exports.updateMedicalConsultation = async (id, relative_id, type, city_id, date, reason) => {
  const query = 'UPDATE medical_consultations SET relative_id = $1, type = $2, city_id = $3, date = $4, reason = $5 WHERE id = $6 RETURNING *';
  const values = [relative_id, type, city_id, date, reason, id];
  const result = await pool.query(query, values);
  return new MedicalConsultation(id, relative_id, type, city_id, date, reason);
};

exports.deleteMedicalConsultation = async (id) => {
  const query = 'DELETE FROM medical_consultations WHERE id = $1';
  await pool.query(query, [id]);
};
