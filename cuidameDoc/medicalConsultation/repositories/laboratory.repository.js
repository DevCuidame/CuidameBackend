const pool = require("../../../utils/connection");
const Laboratory = require("../model/laboratory.model");

exports.createLaboratory = async (medical_consult_id, exam_type, exam, date, result, pathology_report) => {
  const query = 'INSERT INTO laboratory (medical_consult_id, exam_type, exam, date, result, pathology_report) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  const values = [medical_consult_id, exam_type, exam, date, result, pathology_report];
  const result_ = await pool.query(query, values);
  const { id } = result_.rows[0];
  return new Laboratory(id, medical_consult_id, exam_type, exam, date, result, pathology_report);
};

exports.getLaboratory = async (id) => {
  const query = 'SELECT * FROM laboratory WHERE id = $1';
  const result_ = await pool.query(query, [id]);
  if (!result_.rows.length) {
    return null;  
  }
  const { medical_consult_id, exam_type, exam, date, result, pathology_report } = result_.rows[0];
  return new Laboratory(id, medical_consult_id, exam_type, exam, date, result, pathology_report);
};

exports.getAllLaboratories = async () => {
  const query = 'SELECT * FROM laboratory';
  const result = await pool.query(query);
  if (!result.rows.length) {
    return null;  
  }
  return result.rows.map(row => {
    const { id, medical_consult_id, exam_type, exam, date, result, pathology_report } = row;
    return new Laboratory(id, medical_consult_id, exam_type, exam, date, result, pathology_report);
  });
};

exports.updateLaboratory = async (id, medical_consult_id, exam_type, exam, date, result, pathology_report) => {
  const query = 'UPDATE laboratory SET medical_consult_id = $1, exam_type = $2, exam = $3, date = $4, result = $5, pathology_report = $6 WHERE id = $7 RETURNING *';
  const values = [medical_consult_id, exam_type, exam, date, result, pathology_report, id];
  const result_ = await pool.query(query, values);
  return new Laboratory(id, medical_consult_id, exam_type, exam, date, result, pathology_report);
};

exports.deleteLaboratory = async (id) => {
  const query = 'DELETE FROM laboratory WHERE id = $1';
  await pool.query(query, [id]);
};
