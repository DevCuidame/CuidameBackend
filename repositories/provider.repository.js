// repositories/userRepository.js

const pool = require("../utils/connection");

exports.createProvider = async (data) => {
  const { provider_type, identification_type, identification_number, full_name, email, phone, address, city, photo_bs64, pub_photo, priv_photo, status } = data;
  const query = 'INSERT INTO provider (provider_type, identification_type, identification_number, full_name, email, phone, address, city, photo_bs64, pub_photo, priv_photo, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *';
  const values = [provider_type, identification_type, identification_number, full_name, email, phone, address, city, photo_bs64, pub_photo, priv_photo, status];
  const result = await pool.query(query, values);
  return result.rows[0];
};

exports.getProvider = async (id) => {
  const query = 'SELECT * FROM provider WHERE id = $1';
  const result = await pool.query(query, [id]);
  
  return result.rows[0];
};

exports.getProviderByEmail = async (email) => {
  const query = 'SELECT * FROM provider WHERE email = $1';
  const result = await pool.query(query, [email]);
  
  return result.rows[0];
};

exports.getProviderByCardId = async (id) => {
  const query = 'SELECT * FROM provider WHERE identification_number = $1';
  const result = await pool.query(query, [id]);
  
  return result.rows[0];
};

exports.updateProvider = async (id, data) => {
  const { provider_type, identification_type, identification_number, full_name, email, phone, address, city, department, photo_bs64, pub_photo, priv_photo, status } = data;
  const query = 'UPDATE provider SET provider_type = $1, identification_type = $2, identification_number = $3, full_name = $4, email = $5, phone = $6, address = $7, city = $8, department = $9, photo_bs4 = $10, pub_photo = $11, priv_photo = $12, status = $13 WHERE id = $14 RETURNING *';
  const values = [provider_type, identification_type, identification_number, full_name, email, phone, address, city, department, photo_bs64, pub_photo, priv_photo, status, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

exports.deleteProvider = async (id) => {
  await pool.query('DELETE FROM provider WHERE id = $1', [id]);
};
