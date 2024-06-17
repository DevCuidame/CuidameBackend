const pool = require("../../../utils/connection");
const HealthInsurance = require("../models/HealthInsurance");

exports.createHealthInsurance = async (company, address1, address2, city, phone, email) => {
  const query = 'INSERT INTO health_insurances (company, address1, address2, city, phone, email) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  const values = [company, address1, address2, city, phone, email];
  const result = await pool.query(query, values);
  const { id } = result.rows[0];
  return new HealthInsurance(id, company, address1, address2, city, phone, email);
};

exports.getHealthInsurance = async (id) => {
  const query = 'SELECT * FROM health_insurances WHERE id = $1';
  const result = await pool.query(query, [id]);
  const { company, address1, address2, city, phone, email } = result.rows[0];
  return new HealthInsurance(id, company, address1, address2, city, phone, email);
};

exports.getAllHealthInsurances = async () => {
  const query = 'SELECT * FROM health_insurances';
  const result = await pool.query(query);
  return result.rows.map(row => {
    const { id, company, address1, address2, city, phone, email } = row;
    return new HealthInsurance(id, company, address1, address2, city, phone, email);
  });
};

exports.updateHealthInsurance = async (id, company, address1, address2, city, phone, email) => {
  const query = 'UPDATE health_insurances SET company = $1, address1 = $2, address2 = $3, city = $4, phone = $5, email = $6 WHERE id = $7 RETURNING *';
  const values = [company, address1, address2, city, phone, email, id];
  const result = await pool.query(query, values);
  return new HealthInsurance(id, company, address1, address2, city, phone, email);
};

exports.deleteHealthInsurance = async (id) => {
  const query = 'DELETE FROM health_insurances WHERE id = $1';
  await pool.query(query, [id]);
};
