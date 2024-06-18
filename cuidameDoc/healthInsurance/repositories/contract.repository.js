const pool = require("../../../utils/connection");
const Contract = require("../model/contract.model");

exports.createContract = async (health_insurance_id, type, start_date, end_date) => {
  const query = 'INSERT INTO contract (health_insurance_id, type, start_date, end_date) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [health_insurance_id, type, start_date, end_date];
  const result = await pool.query(query, values);
  const { id } = result.rows[0];
  return new Contract(id, health_insurance_id, type, start_date, end_date);
};

exports.getContract = async (id) => {
  const query = 'SELECT * FROM contract WHERE id = $1';
  const result = await pool.query(query, [id]);
  if (!result.rows.length) {
    return null;  
  }
  const { health_insurance_id, type, start_date, end_date } = result.rows[0];
  return new Contract(id, health_insurance_id, type, start_date, end_date);
};

exports.getAllContracts = async () => {
  const query = 'SELECT * FROM contract';
  const result = await pool.query(query);
  if (!result.rows.length) {
    return null;  
  }
  return result.rows.map(row => {
    const { id, health_insurance_id, type, start_date, end_date } = row;
    return new Contract(id, health_insurance_id, type, start_date, end_date);
  });
};

exports.updateContract = async (id, health_insurance_id, type, start_date, end_date) => {
  const query = 'UPDATE contract SET health_insurance_id = $1, type = $2, start_date = $3, end_date = $4 WHERE id = $5 RETURNING *';
  const values = [health_insurance_id, type, start_date, end_date, id];
  const result = await pool.query(query, values);
  return new Contract(id, health_insurance_id, type, start_date, end_date);
};

exports.deleteContract = async (id) => {
  const query = 'DELETE FROM contract WHERE id = $1';
  await pool.query(query, [id]);
};
