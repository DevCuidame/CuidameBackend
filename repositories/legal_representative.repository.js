
const pool = require("../utils/connection");

exports.createLegalRep = async (data) => {
  const {provider_id,
    identification_type,
    identification_number,
    full_name,
    email} = data;
  const query = 'INSERT INTO legal_representative (provider_id, identification_type, identification_number, full_name, email) VALUES ($1, $2, $3, $4, $5) RETURNING *';
  const values = [provider_id, identification_type, identification_number, full_name, email];
  const result = await pool.query(query, values);
  return result.rows;
};

exports.getLegalRep = async (id) => {
  const query = 'SELECT * FROM legal_representative WHERE provider_id = $1';
  const result = await pool.query(query, [id]);
  return result.rows;
};