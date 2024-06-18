const pool = require("../../../utils/connection");
const RegimentType = require("../model/regimentType.model");

exports.createRegimentType = async (health_insurance_id, regiment_type, category, max_value_event) => {
  const query = 'INSERT INTO regiment_types (health_insurance_id, regiment_type, category, max_value_event) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [health_insurance_id, regiment_type, category, max_value_event];
  const result = await pool.query(query, values);
  const { id } = result.rows[0];
  return new RegimentType(id, health_insurance_id, regiment_type, category, max_value_event);
};

exports.getRegimentType = async (id) => {
  const query = 'SELECT * FROM regiment_types WHERE id = $1';
  const result = await pool.query(query, [id]);
  const { health_insurance_id, regiment_type, category, max_value_event } = result.rows[0];
  return new RegimentType(id, health_insurance_id, regiment_type, category, max_value_event);
};

exports.getAllRegimentTypes = async () => {
  const query = 'SELECT * FROM regiment_types';
  const result = await pool.query(query);
  return result.rows.map(row => {
    const { id, health_insurance_id, regiment_type, category, max_value_event } = row;
    return new RegimentType(id, health_insurance_id, regiment_type, category, max_value_event);
  });
};

exports.updateRegimentType = async (id, health_insurance_id, regiment_type, category, max_value_event) => {
  const query = 'UPDATE regiment_types SET health_insurance_id = $1, regiment_type = $2, category = $3, max_value_event = $4 WHERE id = $5 RETURNING *';
  const values = [health_insurance_id, regiment_type, category, max_value_event, id];
  const result = await pool.query(query, values);
  return new RegimentType(id, health_insurance_id, regiment_type, category, max_value_event);
};

exports.deleteRegimentType = async (id) => {
  const query = 'DELETE FROM regiment_types WHERE id = $1';
  await pool.query(query, [id]);
};
