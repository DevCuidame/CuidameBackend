
const pool = require("../utils/connection");

exports.createDocument = async (data) => {
  const {provider_id, own, establishment_name, name, document_url} = data;
  const query = 'INSERT INTO documents (provider_id, own, establishment_name, name, document_url) VALUES ($1, $2, $3, $4, $5) RETURNING *';
  const values = [provider_id, own, establishment_name, name, document_url];
  const result = await pool.query(query, values);
  return result.rows[0];
};

exports.getDocument = async (id) => {
  const query = 'SELECT * FROM documents WHERE id = $1';
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

exports.updateDocument = async (id, data) => {
const {provider_id, own, establishment_name, name, document_url} = data;
  const query = 'UPDATE documents SET provider_id = $1, own = $2, establishment_name = $3, name = $4, document_url = $5 WHERE id = $6 RETURNING *';
  const values = [provider_id, own, establishment_name, name, document_url, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

exports.deleteDocument = async (id) => {
  await pool.query('DELETE FROM documents WHERE id = $1', [id]);
};

