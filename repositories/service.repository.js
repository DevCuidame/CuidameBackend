const pool = require("../utils/connection");

exports.createService = async (name, providerId, active) => {
  const query = 'INSERT INTO services (name, provider_id, active) VALUES ($1, $2, $3) RETURNING *';
  const values = [name, providerId, active];
  const result = await pool.query(query, values);
  return result.rows[0];
};

exports.getService = async (id) => {
  const query = 'SELECT * FROM services WHERE id = $1';
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

exports.getAllServices = async () => {
  const query = 'SELECT * FROM services';
  const result = await pool.query(query);
  return result.rows;
};

exports.updateService = async (id, name, providerId, active) => {
  const query = 'UPDATE services SET name = $1, provider_id = $2, active = $3 WHERE id = $4 RETURNING *';
  const values = [name, providerId, active, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

exports.deleteService = async (id) => {
  await pool.query('DELETE FROM service WHERE id = $1', [id]);
};
