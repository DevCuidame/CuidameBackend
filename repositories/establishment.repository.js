
const pool = require("../utils/connection");

exports.createEstablishment = async (data) => {
  const {provider_id, own, full_name} = data;
  const query = 'INSERT INTO establishment (provider_id, own, full_name) VALUES ($1, $2, $3) RETURNING *';
  const values = [provider_id, own, full_name];
  const result = await pool.query(query, values);
  return result.rows;
};

exports.getEstablishment = async (id) => {
  const query = 'SELECT * FROM establishment WHERE provider_id = $1';
  const result = await pool.query(query, [id]);
  return result.rows;
};