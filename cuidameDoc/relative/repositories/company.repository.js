const pool = require("../../../utils/connection");
const Company = require("../model/company.model");

exports.createCompany = async (name, address, nit, phone, contact, city_id) => {
  const query = 'INSERT INTO company (name, address, nit, phone, contact, city_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  const values = [name, address, nit, phone, contact, city_id];
  const result = await pool.query(query, values);
  const { id } = result.rows[0];
  return new Company(id, name, address, nit, phone, contact, city_id);
};

exports.getCompany = async (id) => {
  const query = 'SELECT * FROM company WHERE id = $1';
  const result = await pool.query(query, [id]);
  if (!result.rows.length) {
    return null;  
  }
  const { name, address, nit, phone, contact, city_id } = result.rows[0];
  return new Company(id, name, address, nit, phone, contact, city_id);
};

exports.getCompanyByNit = async (id) => {
  const query = 'SELECT * FROM company WHERE nit = $1';
  const result = await pool.query(query, [id]);
  if (!result.rows.length) {
    return null;  
  }
  const { name, address, nit, phone, contact, city_id } = result.rows[0];
  return new Company(id, name, address, nit, phone, contact, city_id);
};

exports.getAllCompanies = async () => {
  const query = 'SELECT * FROM company';
  const result = await pool.query(query);
  if (!result.rows.length) {
    return null;  
  }
  return result.rows.map(row => {
    const { id, name, address, nit, phone, contact, city_id } = row;
    return new Company(id, name, address, nit, phone, contact, city_id);
  });
};

exports.updateCompany = async (id, name, address, nit, phone, contact, city_id) => {
  const query = 'UPDATE company SET name = $1, address = $2, nit = $3, phone = $4, contact = $5, city_id = $6 WHERE id = $7 RETURNING *';
  const values = [name, address, nit, phone, contact, city_id, id];
  const result = await pool.query(query, values);
  return new Company(id, name, address, nit, phone, contact, city_id);
};

exports.deleteCompany = async (id) => {
  const query = 'DELETE FROM company WHERE id = $1';
  await pool.query(query, [id]);
};
