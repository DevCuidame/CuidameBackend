const pool = require("../../../utils/connection");
const Role = require("../model/role.model");

exports.createRole = async (name, status) => {
  const query = 'INSERT INTO roles (name, status) VALUES ($1, $2) RETURNING *';
  const values = [name, status];
  const result = await pool.query(query, values);
  const { id } = result.rows[0];
  return new Role(id, name, status);
};

exports.getRole = async (id) => {
  const query = 'SELECT * FROM roles WHERE id = $1';
  const result = await pool.query(query, [id]);
  const { name, status } = result.rows[0];
  return new Role(id, name, status);
};

exports.getAllRoles = async () => {
  const query = 'SELECT * FROM roles';
  const result = await pool.query(query);
  return result.rows.map(row => {
    const { id, name, status } = row;
    return new Role(id, name, status);
  });
};

exports.updateRole = async (id, name, status) => {
  const query = 'UPDATE roles SET name = $1, status = $2 WHERE id = $3 RETURNING *';
  const values = [name, status, id];
  const result = await pool.query(query, values);
  return new Role(id, name, status);
};

exports.deleteRole = async (id) => {
  const query = 'DELETE FROM roles WHERE id = $1';
  await pool.query(query, [id]);
};
