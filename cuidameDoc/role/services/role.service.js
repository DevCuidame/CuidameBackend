const roleRepository = require('../repositories/role.repository');

exports.createRole = async (name, status) => {
  return roleRepository.createRole(name, status);
};

exports.getRole = async (id) => {
  return roleRepository.getRole(id);
};

exports.updateRole = async (id, name, status) => {
  return roleRepository.updateRole(id, name, status);
};

exports.deleteRole = async (id) => {
  return roleRepository.deleteRole(id);
};

exports.getAllRoles = async () => {
  return roleRepository.getAllRoles();
};
