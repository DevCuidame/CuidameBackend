const pool = require("../../../utils/connection");
const Population = require("../model/population.model");

exports.createPopulation = async (first_name, last_name, identification_type, identification_number, age, gender, marital_status, place_of_birth, address, category, regiment_type, phone, occupation, status, position, contract_id) => {
  const query = 'INSERT INTO population (first_name, last_name, identification_type, identification_number, age, gender, marital_status, place_of_birth, address, category, regiment_type, phone, occupation, status, position, contract_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *';
  const values = [first_name, last_name, identification_type, identification_number, age, gender, marital_status, place_of_birth, address, category, regiment_type, phone, occupation, status, position, contract_id];
  const result = await pool.query(query, values);
  const { id } = result.rows[0];
  return new Population(id, first_name, last_name, identification_type, identification_number, age, gender, marital_status, place_of_birth, address, category, regiment_type, phone, occupation, status, position, contract_id);
};

exports.getPopulation = async (id) => {
  const query = 'SELECT * FROM population WHERE id = $1';
  const result = await pool.query(query, [id]);
  if (!result.rows.length) {
    return null;  
  }
  const { first_name, last_name, identification_type, identification_number, age, gender, marital_status, place_of_birth, address, category, regiment_type, phone, occupation, status, position, contract_id } = result.rows[0];
  return new Population(id, first_name, last_name, identification_type, identification_number, age, gender, marital_status, place_of_birth, address, category, regiment_type, phone, occupation, status, position, contract_id);
};

exports.getPopulationByCard = async (id) => {
  const query = 'SELECT * FROM population WHERE identification_number = $1';
  const result = await pool.query(query, [id]);
  if (!result.rows.length) {
    return null;  
  }
  const { first_name, last_name, identification_type, identification_number, age, gender, marital_status, place_of_birth, address, category, regiment_type, phone, occupation, status, position, contract_id } = result.rows[0];
  return new Population(id, first_name, last_name, identification_type, identification_number, age, gender, marital_status, place_of_birth, address, category, regiment_type, phone, occupation, status, position, contract_id);
};


exports.getAllPopulations = async () => {
  const query = 'SELECT * FROM population';
  const result = await pool.query(query);
  if (!result.rows.length) {
    return null;  
  }
  return result.rows.map(row => {
    const { id, first_name, last_name, identification_type, identification_number, age, gender, marital_status, place_of_birth, address, category, regiment_type, phone, occupation, status, position, contract_id } = row;
    return new Population(id, first_name, last_name, identification_type, identification_number, age, gender, marital_status, place_of_birth, address, category, regiment_type, phone, occupation, status, position, contract_id);
  });
};

exports.updatePopulation = async (id, first_name, last_name, identification_type, identification_number, age, gender, marital_status, place_of_birth, address, category, regiment_type, phone, occupation, status, position, contract_id) => {
  const query = 'UPDATE population SET first_name = $1, last_name = $2, identification_type = $3, identification_number = $4, age = $5, gender = $6, marital_status = $7, place_of_birth = $8, address = $9, category = $10, regiment_type = $11, phone = $12, occupation = $13, status = $14, position = $15, contract_id = $16 WHERE id = $17 RETURNING *';
  const values = [first_name, last_name, identification_type, identification_number, age, gender, marital_status, place_of_birth, address, category, regiment_type, phone, occupation, status, position, contract_id, id];
  const result = await pool.query(query, values);
  return new Population(id, first_name, last_name, identification_type, identification_number, age, gender, marital_status, place_of_birth, address, category, regiment_type, phone, occupation, status, position, contract_id);
};

exports.deletePopulation = async (id) => {
  const query = 'DELETE FROM population WHERE id = $1';
  await pool.query(query, [id]);
};
