// controllers/RoleController.js
const roleService = require("../services/role.service");

exports.createRole = async (req, res) => {
  try {
    const { name, status } = req.body;
    const newRole = await roleService.createRole(name, status);
    res.status(200).json({
      mensaje: "Rol creado correctamente",
      nuevoRol: newRole,
      exito: true
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al crear rol",
      error: error.message,
      exito: false
    });
  }
};

exports.getRole = async (req, res) => {
  try {
    const idRol = req.params.id;
    const rol = await roleService.getRole(idRol);
    if (!rol) {
      return res.status(404).json({ error: "Rol no encontrado" });
    }
    res.json(rol);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const idRol = req.params.id;
    const { name, status } = req.body;
    const rolActualizado = await roleService.updateRole(idRol, name, status);
    res.json({
      mensaje: "Rol actualizado correctamente",
      rolActualizado
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al actualizar rol",
      error: error.message
    });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    const idRol = req.params.id;
    await roleService.deleteRole(idRol);
    res.json({ mensaje: "Rol eliminado correctamente" });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar rol",
      error: error.message
    });
  }
};

exports.getAllRoles = async (req, res) => {
  try {
    const roles = await roleService.getAllRoles();
    res.json(roles);
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al obtener todos los roles",
      error: error.message
    });
  }
};
