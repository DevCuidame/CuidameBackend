const pool = require("../../../utils/connection");
const Sites = require("../model/sites.model");

exports.createSite = async (address, phone, contact, city_id, company_id) => {
  const query = 'INSERT INTO sites (address, phone, contact, city_id, company_id) VALUES ($1, $2, $3, $4, $5) RETURNING *';
  const values = [address, phone, contact, city_id, company_id];
  const result = await pool.query(query, values);
  const { id } = result.rows[0];
  return new Sites(id, address, phone, contact, city_id, company_id);
};

exports.getSite = async (id) => {
  const query = 'SELECT * FROM sites WHERE id = $1';
  const result = await pool.query(query, [id]);
  const { address, phone, contact, city_id, company_id } = result.rows[0];
  return new Sites(id, address, phone, contact, city_id, company_id);
};

exports.getAllSites = async () => {
  const query = 'SELECT * FROM sites';
  const result = await pool.query(query);
  return result.rows.map(row => {
    const { id, address, phone, contact, city_id, company_id } = row;
    return new Sites(id, address, phone, contact, city_id, company_id);
  });
};

exports.updateSite = async (id, address, phone, contact, city_id, company_id) => {
  const query = 'UPDATE sites SET address = $1, phone = $2, contact = $3, city_id = $4, company_id = $5 WHERE id = $6 RETURNING *';
  const values = [address, phone, contact, city_id, company_id, id];
  const result = await pool.query(query, values);
  return new Sites(id, address, phone, contact, city_id, company_id);
};

exports.deleteSite = async (id) => {
  const query = 'DELETE FROM sites WHERE id = $1';
  await pool.query(query, [id]);
};
