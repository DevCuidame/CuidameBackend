const pool = require("../utils/connection");

exports.createService = async (provider_id, service_id, status) => {
  const query = 'INSERT INTO provider_services (provider_id, service_id, status) VALUES ($1, $2, $3) RETURNING *';
  const values = [provider_id, service_id, status];
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

exports.updateService = async (id, provider_id, service_id, status) => {
  const query = 'UPDATE services SET provider_id = $1, service_id = $2, status = $3 WHERE id = $4 RETURNING *';
  const values = [provider_id, service_id, status, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

exports.deleteService = async (id) => {
  await pool.query('DELETE FROM service WHERE id = $1', [id]);
};
