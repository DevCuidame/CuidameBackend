
const pool = require("../utils/connection");

exports.createDocument = async (data) => {
  const {provider_id, pub_name, priv_name, file_bs64} = data;
  const query = 'INSERT INTO documents (provider_id, pub_name, priv_name, file_bs64) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [provider_id, pub_name, priv_name, file_bs64];
  const result = await pool.query(query, values);
  return result.rows;
};

exports.getDocument = async (id) => {
  const query = 'SELECT * FROM documents WHERE id = $1';
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

exports.updateDocument = async (id, data) => {
const {provider_id, pub_name, priv_name, file_bs64} = data;
  const query = 'UPDATE documents SET provider_id = $1, own = $2, establishment_name = $3, name = $4, document_url = $5 WHERE id = $6 RETURNING *';
  const values = [provider_id, pub_name, priv_name, file_bs64, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

exports.deleteDocument = async (id) => {
  await pool.query('DELETE FROM documents WHERE id = $1', [id]);
};

