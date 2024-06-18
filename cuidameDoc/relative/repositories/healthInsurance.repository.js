const pool = require("../../../utils/connection");
const HealthInsurance = require("../model/healthInsurance.model");

exports.createHealthInsurance = async (company, address1, address2, city, phone, email) => {
  const query = 'INSERT INTO healthInsurance (company, address1, address2, city, phone, email) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  const values = [company, address1, address2, city, phone, email];
  const result = await pool.query(query, values);
  const { id } = result.rows[0];
  return new HealthInsurance(id, company, address1, address2, city, phone, email);
};

exports.getHealthInsurance = async (id) => {
  const query = 'SELECT * FROM healthInsurance WHERE id = $1';
  const result = await pool.query(query, [id]);
  if (!result.rows.length) {
    return null;  
  }
  const { company, address1, address2, city, phone, email } = result.rows[0];
  return new HealthInsurance(id, company, address1, address2, city, phone, email);
};

exports.getHealthInsuranceByEmail = async (id) => {
  const query = 'SELECT * FROM healthInsurance WHERE email = $1';
  const result = await pool.query(query, [id]);
  if (!result.rows.length) {
    return null;  
  }
  const { company, address1, address2, city, phone, email } = result.rows[0];
  return new HealthInsurance(id, company, address1, address2, city, phone, email);
};

exports.getAllHealthInsurances = async () => {
  const query = 'SELECT * FROM healthInsurance';
  const result = await pool.query(query);
  if (!result.rows.length) {
    return null;  
  }
  return result.rows.map(row => {
    const { id, company, address1, address2, city, phone, email } = row;
    return new HealthInsurance(id, company, address1, address2, city, phone, email);
  });
};

exports.updateHealthInsurance = async (id, company, address1, address2, city, phone, email) => {
  const query = 'UPDATE healthInsurance SET company = $1, address1 = $2, address2 = $3, city = $4, phone = $5, email = $6 WHERE id = $7 RETURNING *';
  const values = [company, address1, address2, city, phone, email, id];
  const result = await pool.query(query, values);
  return new HealthInsurance(id, company, address1, address2, city, phone, email);
};

exports.deleteHealthInsurance = async (id) => {
  const query = 'DELETE FROM healthInsurance WHERE id = $1';
  await pool.query(query, [id]);
};
