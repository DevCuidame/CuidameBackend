const pool = require("../../../utils/connection");
const UserRole = require("../models/UserRole");

exports.createUserRole = async (user_id, role_id) => {
  const query = 'INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2) RETURNING *';
  const values = [user_id, role_id];
  const result = await pool.query(query, values);
  const { id } = result.rows[0];
  return new UserRole(id, user_id, role_id);
};

exports.getUserRole = async (id) => {
  const query = 'SELECT * FROM user_roles WHERE id = $1';
  const result = await pool.query(query, [id]);
  const { user_id, role_id } = result.rows[0];
  return new UserRole(id, user_id, role_id);
};

exports.getAllUserRoles = async () => {
  const query = 'SELECT * FROM user_roles';
  const result = await pool.query(query);
  return result.rows.map(row => {
    const { id, user_id, role_id } = row;
    return new UserRole(id, user_id, role_id);
  });
};

exports.updateUserRole = async (id, user_id, role_id) => {
  const query = 'UPDATE user_roles SET user_id = $1, role_id = $2 WHERE id = $3 RETURNING *';
  const values = [user_id, role_id, id];
  const result = await pool.query(query, values);
  return new UserRole(id, user_id, role_id);
};

exports.deleteUserRole = async (id) => {
  const query = 'DELETE FROM user_roles WHERE id = $1';
  await pool.query(query, [id]);
};
