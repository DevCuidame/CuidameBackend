// controllers/RoleController.js
const roleService = require("../services/role.service");

exports.createRole = async (req, res) => {
  try {
    const { name, status } = req.body;

    const exists = await roleService.getRoleByName(name);
    if (exists){
      return res.status(400).json({
        message: "Rol ya existe",
        success: false
      });
    }

    const newRole = await roleService.createRole(name, status);
    return res.status(200).json({
      message: "Rol creado correctamente",
      nuevoRol: newRole,
      success: true
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error al crear rol",
      error: error.message,
      success: false
    });
  }
};

exports.getRole = async (req, res) => {
  try {
    const idRole = req.params.id;
    const rol = await roleService.getRole(idRole);
    if (!rol) {
      return res.status(404).json({ error: "Rol no encontrado" });
    }
    return res.status(200).json({rol, success: true});
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const idRole = req.params.id;
    const { name, status } = req.body;
    const updatedRole = await roleService.updateRole(idRole, name, status);
    return res.status(200).json({
      message: "Rol actualizado correctamente",
      updatedRole, success: true
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error al actualizar rol",
      error: error.message, success: false
    });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    const idRole = req.params.id;
    await roleService.deleteRole(idRole);
    return res.status(200).json({ message: "Rol eliminado correctamente" , success: true});
  } catch (error) {
    return res.status(500).json({
      message: "Error al eliminar rol",
      error: error.message, success: false
    });
  }
};

exports.getAllRoles = async (req, res) => {
  try {
    const roles = await roleService.getAllRoles();
    return res.status(200).json({roles, success: true});
  } catch (error) {
    return res.status(400).json({
      message: "Error al obtener todos los roles",
      error: error.message, success: false
    });
  }
};
