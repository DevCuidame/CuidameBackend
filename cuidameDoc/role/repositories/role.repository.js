const pool = require("../../../utils/connection");
const Role = require("../model/role.model");

exports.createRole = async (name, status) => {
  const query = 'INSERT INTO role (name, status) VALUES ($1, $2) RETURNING *';
  const values = [name, status];
  const result = await pool.query(query, values);
  const { id } = result.rows[0];
  return new Role(id, name, status);
};

exports.getRole = async (id) => {
  const query = 'SELECT * FROM role WHERE id = $1';
  const result = await pool.query(query, [id]);
  if (!result.rows.length) {
    return null;  
  }
  const { name, status } = result.rows[0];
  return new Role(id, name, status);
};

exports.getRoleByName = async (id) => {
  const query = 'SELECT * FROM role WHERE name = $1';
  const result = await pool.query(query, [id]);
  if (!result.rows.length) {
    return null;  
  }
  const { name, status } = result.rows[0];
  return new Role(id, name, status);
};

exports.getAllRoles = async () => {
  const query = 'SELECT * FROM role';
  const result = await pool.query(query);
  if (!result.rows.length) {
    return null;  
  }
  return result.rows.map(row => {
    const { id, name, status } = row;
    return new Role(id, name, status);
  });
};

exports.updateRole = async (id, name, status) => {
  const query = 'UPDATE role SET name = $1, status = $2 WHERE id = $3 RETURNING *';
  const values = [name, status, id];
  const result = await pool.query(query, values);
  return new Role(id, name, status);
};

exports.deleteRole = async (id) => {
  const query = 'DELETE FROM role WHERE id = $1';
  await pool.query(query, [id]);
};
