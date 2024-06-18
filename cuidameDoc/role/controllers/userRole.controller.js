// controllers/UserRoleController.js
const userRoleService = require("../services/userRole.service");

exports.createUserRole = async (req, res) => {
  try {
    const { user_id, role_id } = req.body;


    const exists = await userRoleService.getUserRoleByUser(user_id, role_id);

    if (exists) {
      return res.status(400).json({
        message: "El Usuario ya tiene el role",
        success: false
      });
    }

    const newUserRole = await userRoleService.createUserRole(user_id, role_id);
    return res.status(200).json({
      message: "Rol de usuario creado correctamente",
      newUserRole: newUserRole,
      success: true
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error al crear rol de usuario",
      error: error.message,
      success: false
    });
  }
};

exports.getUserRole = async (req, res) => {
  try {
    const idUserRole = req.params.id;
    const userRole = await userRoleService.getUserRole(idUserRole);
    if (!userRole) {
      return res.status(404).json({ error: "Rol de usuario no encontrado", success: false });
    }
    return res.status(200).json({userRole, success: true});
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const idUserRole = req.params.id;
    const { user_id, role_id } = req.body;

    
    const exists = await userRoleService.getUserRoleByUser(user_id, role_id);

    if (exists) {
      return res.status(400).json({
        message: "El Usuario ya tiene el role",
        success: false
      });
    }

    const updatedUserRole = await userRoleService.updateUserRole(idUserRole, user_id, role_id);
    return res.status(200).json({
      message: "Rol de usuario actualizado correctamente",
      updatedUserRole, success: true
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error al actualizar rol de usuario",
      error: error.message, success: false
    });
  }
};

exports.deleteUserRole = async (req, res) => {
  try {
    const idUserRole = req.params.id;
    await userRoleService.deleteUserRole(idUserRole);
    return res.status(200).json({ message: "Rol de usuario eliminado correctamente", success: true });
  } catch (error) {
    return res.status(500).json({
      message: "Error al eliminar rol de usuario",
      error: error.message, success: false
    });
  }
};

exports.getAllUserRoles = async (req, res) => {
  try {
    const usuariosRoles = await userRoleService.getAllUserRoles();
    return res.status(200).json({usuariosRoles, success: true});
  } catch (error) {
    return res.status(400).json({
      message: "Error al obtener todos los roles de usuario",
      error: error.message, success: false
    });
  }
};
