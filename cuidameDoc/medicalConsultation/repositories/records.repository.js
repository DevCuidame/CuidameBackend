const pool = require("../../../utils/connection");
const Records = require("../models/Records");

exports.createRecord = async (medical_consult_id, type, date, description) => {
  const query = 'INSERT INTO records (medical_consult_id, type, date, description) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [medical_consult_id, type, date, description];
  const result = await pool.query(query, values);
  const { id } = result.rows[0];
  return new Records(id, medical_consult_id, type, date, description);
};

exports.getRecord = async (id) => {
  const query = 'SELECT * FROM records WHERE id = $1';
  const result = await pool.query(query, [id]);
  const { medical_consult_id, type, date, description } = result.rows[0];
  return new Records(id, medical_consult_id, type, date, description);
};

exports.getAllRecords = async () => {
  const query = 'SELECT * FROM records';
  const result = await pool.query(query);
  return result.rows.map(row => {
    const { id, medical_consult_id, type, date, description } = row;
    return new Records(id, medical_consult_id, type, date, description);
  });
};

exports.updateRecord = async (id, medical_consult_id, type, date, description) => {
  const query = 'UPDATE records SET medical_consult_id = $1, type = $2, date = $3, description = $4 WHERE id = $5 RETURNING *';
  const values = [medical_consult_id, type, date, description, id];
  const result = await pool.query(query, values);
  return new Records(id, medical_consult_id, type, date, description);
};

exports.deleteRecord = async (id) => {
  const query = 'DELETE FROM records WHERE id = $1';
  await pool.query(query, [id]);
};
