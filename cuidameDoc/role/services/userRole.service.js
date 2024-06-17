const userRoleRepository = require('../repositories/userRole.repository');

exports.createUserRole = async (user_id, role_id) => {
  return userRoleRepository.createUserRole(user_id, role_id);
};

exports.getUserRole = async (id) => {
  return userRoleRepository.getUserRole(id);
};

exports.updateUserRole = async (id, user_id, role_id) => {
  return userRoleRepository.updateUserRole(id, user_id, role_id);
};

exports.deleteUserRole = async (id) => {
  return userRoleRepository.deleteUserRole(id);
};

exports.getAllUserRoles = async () => {
  return userRoleRepository.getAllUserRoles();
};
