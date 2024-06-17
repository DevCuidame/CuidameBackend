const pool = require("../../../utils/connection");
const OtherSpecialties = require("../models/OtherSpecialties");

exports.createOtherSpecialty = async (medical_consult_id, type, date, concept, result, pathology_report) => {
  const query = 'INSERT INTO other_specialties (medical_consult_id, type, date, concept, result, pathology_report) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  const values = [medical_consult_id, type, date, concept, result, pathology_report];
  const result = await pool.query(query, values);
  const { id } = result.rows[0];
  return new OtherSpecialties(id, medical_consult_id, type, date, concept, result, pathology_report);
};

exports.getOtherSpecialty = async (id) => {
  const query = 'SELECT * FROM other_specialties WHERE id = $1';
  const result_ = await pool.query(query, [id]);
  const { medical_consult_id, type, date, concept, result, pathology_report } = result_.rows[0];
  return new OtherSpecialties(id, medical_consult_id, type, date, concept, result, pathology_report);
};

exports.getAllOtherSpecialties = async () => {
  const query = 'SELECT * FROM other_specialties';
  const result = await pool.query(query);
  return result.rows.map(row => {
    const { id, medical_consult_id, type, date, concept, result, pathology_report } = row;
    return new OtherSpecialties(id, medical_consult_id, type, date, concept, result, pathology_report);
  });
};

exports.updateOtherSpecialty = async (id, medical_consult_id, type, date, concept, result, pathology_report) => {
  const query = 'UPDATE other_specialties SET medical_consult_id = $1, type = $2, date = $3, concept = $4, result = $5, pathology_report = $6 WHERE id = $7 RETURNING *';
  const values = [medical_consult_id, type, date, concept, result, pathology_report, id];
  const result = await pool.query(query, values);
  return new OtherSpecialties(id, medical_consult_id, type, date, concept, result, pathology_report);
};

exports.deleteOtherSpecialty = async (id) => {
  const query = 'DELETE FROM other_specialties WHERE id = $1';
  await pool.query(query, [id]);
};
