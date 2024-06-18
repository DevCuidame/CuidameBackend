const pool = require("../../../utils/connection");
const Habits = require("../model/habits.model");

exports.createHabits = async (medical_consult_id, smoke, liquor, other) => {
  const query = 'INSERT INTO habits (medical_consult_id, smoke, liquor, other) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [medical_consult_id, smoke, liquor, other];
  const result = await pool.query(query, values);
  const { id } = result.rows[0];
  return new Habits(id, medical_consult_id, smoke, liquor, other);
};

exports.getHabits = async (id) => {
  const query = 'SELECT * FROM habits WHERE id = $1';
  const result = await pool.query(query, [id]);
  const { medical_consult_id, smoke, liquor, other } = result.rows[0];
  return new Habits(id, medical_consult_id, smoke, liquor, other);
};

exports.getAllHabits = async () => {
  const query = 'SELECT * FROM habits';
  const result = await pool.query(query);
  return result.rows.map(row => {
    const { id, medical_consult_id, smoke, liquor, other } = row;
    return new Habits(id, medical_consult_id, smoke, liquor, other);
  });
};

exports.updateHabits = async (id, medical_consult_id, smoke, liquor, other) => {
  const query = 'UPDATE habits SET medical_consult_id = $1, smoke = $2, liquor = $3, other = $4 WHERE id = $5 RETURNING *';
  const values = [medical_consult_id, smoke, liquor, other, id];
  const result = await pool.query(query, values);
  return new Habits(id, medical_consult_id, smoke, liquor, other);
};

exports.deleteHabits = async (id) => {
  const query = 'DELETE FROM habits WHERE id = $1';
  await pool.query(query, [id]);
};
