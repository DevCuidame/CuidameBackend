const pool = require("../../../utils/connection");
const UserRole = require("../model/userRole.model");

exports.createUserRole = async (user_id, role_id) => {
  const query = 'INSERT INTO userrole (user_id, role_id) VALUES ($1, $2) RETURNING *';
  const values = [user_id, role_id];
  const result = await pool.query(query, values);
  const { id } = result.rows[0];
  return new UserRole(id, user_id, role_id);
};

exports.getUserRole = async (id) => {
  const query = 'SELECT * FROM userrole WHERE id = $1';
  const result = await pool.query(query, [id]);
  if (!result.rows.length) {
    return null;  
  }
  const { user_id, role_id } = result.rows[0];
  return new UserRole(id, user_id, role_id);
};

exports.getUserRoleByUser = async (role, user) => {
  const query = 'SELECT * FROM userrole WHERE role_id = $1 AND user_id = $2';
  const result = await pool.query(query, [role, user]);
  if (!result.rows.length) {
    return null;  
  }
  const { user_id, role_id } = result.rows[0];
  return new UserRole(user_id, role_id);
};

exports.getAllUserRoles = async () => {
  const query = 'SELECT * FROM userrole';
  const result = await pool.query(query);
  if (!result.rows.length) {
    return null;  
  }
  return result.rows.map(row => {
    const { id, user_id, role_id } = row;
    return new UserRole(id, user_id, role_id);
  });
};

exports.updateUserRole = async (id, user_id, role_id) => {
  const query = 'UPDATE userrole SET user_id = $1, role_id = $2 WHERE id = $3 RETURNING *';
  const values = [user_id, role_id, id];
  const result = await pool.query(query, values);
  return new UserRole(id, user_id, role_id);
};

exports.deleteUserRole = async (id) => {
  const query = 'DELETE FROM userrole WHERE id = $1';
  await pool.query(query, [id]);
};
