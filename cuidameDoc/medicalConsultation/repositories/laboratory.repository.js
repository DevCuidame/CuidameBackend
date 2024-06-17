const pool = require("../../../utils/connection");
const Laboratory = require("../models/Laboratory");

exports.createLaboratory = async (medical_consult_id, exam_type, exam, date, result, pathology_report) => {
  const query = 'INSERT INTO laboratories (medical_consult_id, exam_type, exam, date, result, pathology_report) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  const values = [medical_consult_id, exam_type, exam, date, result, pathology_report];
  const result = await pool.query(query, values);
  const { id } = result.rows[0];
  return new Laboratory(id, medical_consult_id, exam_type, exam, date, result, pathology_report);
};

exports.getLaboratory = async (id) => {
  const query = 'SELECT * FROM laboratories WHERE id = $1';
  const result_ = await pool.query(query, [id]);
  const { medical_consult_id, exam_type, exam, date, result, pathology_report } = result_.rows[0];
  return new Laboratory(id, medical_consult_id, exam_type, exam, date, result, pathology_report);
};

exports.getAllLaboratories = async () => {
  const query = 'SELECT * FROM laboratories';
  const result = await pool.query(query);
  return result.rows.map(row => {
    const { id, medical_consult_id, exam_type, exam, date, result, pathology_report } = row;
    return new Laboratory(id, medical_consult_id, exam_type, exam, date, result, pathology_report);
  });
};

exports.updateLaboratory = async (id, medical_consult_id, exam_type, exam, date, result, pathology_report) => {
  const query = 'UPDATE laboratories SET medical_consult_id = $1, exam_type = $2, exam = $3, date = $4, result = $5, pathology_report = $6 WHERE id = $7 RETURNING *';
  const values = [medical_consult_id, exam_type, exam, date, result, pathology_report, id];
  const result = await pool.query(query, values);
  return new Laboratory(id, medical_consult_id, exam_type, exam, date, result, pathology_report);
};

exports.deleteLaboratory = async (id) => {
  const query = 'DELETE FROM laboratories WHERE id = $1';
  await pool.query(query, [id]);
};
