const pool = require("../../../utils/connection");
const Diagnostic = require("../models/Diagnostic");

exports.createDiagnostic = async (medical_consult_id, diagnostic, epicrisis) => {
  const query = 'INSERT INTO diagnostics (medical_consult_id, diagnostic, epicrisis) VALUES ($1, $2, $3) RETURNING *';
  const values = [medical_consult_id, diagnostic, epicrisis];
  const result = await pool.query(query, values);
  const { id } = result.rows[0];
  return new Diagnostic(id, medical_consult_id, diagnostic, epicrisis);
};

exports.getDiagnostic = async (id) => {
  const query = 'SELECT * FROM diagnostics WHERE id = $1';
  const result = await pool.query(query, [id]);
  const { medical_consult_id, diagnostic, epicrisis } = result.rows[0];
  return new Diagnostic(id, medical_consult_id, diagnostic, epicrisis);
};

exports.getAllDiagnostics = async () => {
  const query = 'SELECT * FROM diagnostics';
  const result = await pool.query(query);
  return result.rows.map(row => {
    const { id, medical_consult_id, diagnostic, epicrisis } = row;
    return new Diagnostic(id, medical_consult_id, diagnostic, epicrisis);
  });
};

exports.updateDiagnostic = async (id, medical_consult_id, diagnostic, epicrisis) => {
  const query = 'UPDATE diagnostics SET medical_consult_id = $1, diagnostic = $2, epicrisis = $3 WHERE id = $4 RETURNING *';
  const values = [medical_consult_id, diagnostic, epicrisis, id];
  const result = await pool.query(query, values);
  return new Diagnostic(id, medical_consult_id, diagnostic, epicrisis);
};

exports.deleteDiagnostic = async (id) => {
  const query = 'DELETE FROM diagnostics WHERE id = $1';
  await pool.query(query, [id]);
};
