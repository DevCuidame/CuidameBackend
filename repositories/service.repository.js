const pool = require("../utils/connection");

exports.createService = async (name, providerId, active) => {
  const query = 'INSERT INTO service (name, provider_id, active) VALUES ($1, $2, $3) RETURNING *';
  const values = [name, providerId, active];
  const result = await pool.query(query, values);
  return result.rows[0];
};

exports.getService = async (id) => {
  const query = 'SELECT * FROM service WHERE id = $1';
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

exports.updateService = async (id, name, providerId, active) => {
  const query = 'UPDATE service SET name = $1, provider_id = $2, active = $3 WHERE id = $4 RETURNING *';
  const values = [name, providerId, active, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

exports.deleteService = async (id) => {
  await pool.query('DELETE FROM service WHERE id = $1', [id]);
};
