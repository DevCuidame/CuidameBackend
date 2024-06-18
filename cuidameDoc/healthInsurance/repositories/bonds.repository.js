const pool = require("../../../utils/connection");
const Bonds = require("../model/bonds.model");

exports.createBond = async (health_insurance_id, name, price) => {
  const query = 'INSERT INTO bonds (health_insurance_id, name, price) VALUES ($1, $2, $3) RETURNING *';
  const values = [health_insurance_id, name, price];
  const result = await pool.query(query, values);
  const { id } = result.rows[0];
  return new Bonds(id, health_insurance_id, name, price);
};

exports.getBond = async (id) => {
  const query = 'SELECT * FROM bonds WHERE id = $1';
  const result = await pool.query(query, [id]);
  if (!result.rows.length) {
    return null;  
  }
  const { health_insurance_id, name, price } = result.rows[0];
  return new Bonds(id, health_insurance_id, name, price);
};

exports.getAllBonds = async () => {
  const query = 'SELECT * FROM bonds';
  const result = await pool.query(query);
  if (!result.rows.length) {
    return null;  
  }
  return result.rows.map(row => {
    const { id, health_insurance_id, name, price } = row;
    return new Bonds(id, health_insurance_id, name, price);
  });
};

exports.updateBond = async (id, health_insurance_id, name, price) => {
  const query = 'UPDATE bonds SET health_insurance_id = $1, name = $2, price = $3 WHERE id = $4 RETURNING *';
  const values = [health_insurance_id, name, price, id];
  const result = await pool.query(query, values);
  return new Bonds(id, health_insurance_id, name, price);
};

exports.deleteBond = async (id) => {
  const query = 'DELETE FROM bonds WHERE id = $1';
  await pool.query(query, [id]);
};
