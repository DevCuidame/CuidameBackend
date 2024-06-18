// controllers/UserRoleController.js
const userRoleService = require("../services/userRole.service");

exports.createUserRole = async (req, res) => {
  try {
    const { user_id, role_id } = req.body;
    const newUserRole = await userRoleService.createUserRole(user_id, role_id);
    res.status(200).json({
      mensaje: "Rol de usuario creado correctamente",
      nuevoUsuarioRol: newUserRole,
      exito: true
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al crear rol de usuario",
      error: error.message,
      exito: false
    });
  }
};

exports.getUserRole = async (req, res) => {
  try {
    const idUsuarioRol = req.params.id;
    const usuarioRol = await userRoleService.getUserRole(idUsuarioRol);
    if (!usuarioRol) {
      return res.status(404).json({ error: "Rol de usuario no encontrado" });
    }
    res.json(usuarioRol);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const idUsuarioRol = req.params.id;
    const { user_id, role_id } = req.body;
    const usuarioRolActualizado = await userRoleService.updateUserRole(idUsuarioRol, user_id, role_id);
    res.json({
      mensaje: "Rol de usuario actualizado correctamente",
      usuarioRolActualizado
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al actualizar rol de usuario",
      error: error.message
    });
  }
};

exports.deleteUserRole = async (req, res) => {
  try {
    const idUsuarioRol = req.params.id;
    await userRoleService.deleteUserRole(idUsuarioRol);
    res.json({ mensaje: "Rol de usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar rol de usuario",
      error: error.message
    });
  }
};

exports.getAllUserRoles = async (req, res) => {
  try {
    const usuariosRoles = await userRoleService.getAllUserRoles();
    res.json(usuariosRoles);
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al obtener todos los roles de usuario",
      error: error.message
    });
  }
};
