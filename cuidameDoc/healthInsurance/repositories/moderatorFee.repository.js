const pool = require("../../../utils/connection");
const ModeratorFee = require("../models/ModeratorFee");

exports.createModeratorFee = async (health_insurance_id, name, price, income_range, category, copayment) => {
  const query = 'INSERT INTO moderator_fees (health_insurance_id, name, price, income_range, category, copayment) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  const values = [health_insurance_id, name, price, income_range, category, copayment];
  const result = await pool.query(query, values);
  const { id } = result.rows[0];
  return new ModeratorFee(id, health_insurance_id, name, price, income_range, category, copayment);
};

exports.getModeratorFee = async (id) => {
  const query = 'SELECT * FROM moderator_fees WHERE id = $1';
  const result = await pool.query(query, [id]);
  const { health_insurance_id, name, price, income_range, category, copayment } = result.rows[0];
  return new ModeratorFee(id, health_insurance_id, name, price, income_range, category, copayment);
};

exports.getAllModeratorFees = async () => {
  const query = 'SELECT * FROM moderator_fees';
  const result = await pool.query(query);
  return result.rows.map(row => {
    const { id, health_insurance_id, name, price, income_range, category, copayment } = row;
    return new ModeratorFee(id, health_insurance_id, name, price, income_range, category, copayment);
  });
};

exports.updateModeratorFee = async (id, health_insurance_id, name, price, income_range, category, copayment) => {
  const query = 'UPDATE moderator_fees SET health_insurance_id = $1, name = $2, price = $3, income_range = $4, category = $5, copayment = $6 WHERE id = $7 RETURNING *';
  const values = [health_insurance_id, name, price, income_range, category, copayment, id];
  const result = await pool.query(query, values);
  return new ModeratorFee(id, health_insurance_id, name, price, income_range, category, copayment);
};

exports.deleteModeratorFee = async (id) => {
  const query = 'DELETE FROM moderator_fees WHERE id = $1';
  await pool.query(query, [id]);
};
