const pool = require("../../../utils/connection");
const Diagnostic = require("../model/diagnostic.model");

exports.createDiagnostic = async (medical_consult_id, diagnostic, epicrisis) => {
  const query = 'INSERT INTO diagnostic (medical_consult_id, diagnostic, epicrisis) VALUES ($1, $2, $3) RETURNING *';
  const values = [medical_consult_id, diagnostic, epicrisis];
  const result = await pool.query(query, values);
  const { id } = result.rows[0];
  return new Diagnostic(id, medical_consult_id, diagnostic, epicrisis);
};

exports.getDiagnostic = async (id) => {
  const query = 'SELECT * FROM diagnostic WHERE id = $1';
  const result = await pool.query(query, [id]);
  if (!result.rows.length) {
    return null;  
  }
  const { medical_consult_id, diagnostic, epicrisis } = result.rows[0];
  return new Diagnostic(id, medical_consult_id, diagnostic, epicrisis);
};

exports.getAllDiagnostics = async () => {
  const query = 'SELECT * FROM diagnostic';
  const result = await pool.query(query);
  if (!result.rows.length) {
    return null;  
  }
  return result.rows.map(row => {
    const { id, medical_consult_id, diagnostic, epicrisis } = row;
    return new Diagnostic(id, medical_consult_id, diagnostic, epicrisis);
  });
};

exports.updateDiagnostic = async (id, medical_consult_id, diagnostic, epicrisis) => {
  const query = 'UPDATE diagnostic SET medical_consult_id = $1, diagnostic = $2, epicrisis = $3 WHERE id = $4 RETURNING *';
  const values = [medical_consult_id, diagnostic, epicrisis, id];
  const result = await pool.query(query, values);
  return new Diagnostic(id, medical_consult_id, diagnostic, epicrisis);
};

exports.deleteDiagnostic = async (id) => {
  const query = 'DELETE FROM diagnostic WHERE id = $1';
  await pool.query(query, [id]);
};
