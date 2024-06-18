// controllers/EmergencyContactController.js
const emergencyContactService = require("../services/emergencyContact.service");

exports.createEmergencyContact = async (req, res) => {
  try {
    const { relative_id, first_name, last_name, phone } = req.body;
    const newEmergencyContact = await emergencyContactService.createEmergencyContact(relative_id, first_name, last_name, phone);
    res.status(200).json({
      mensaje: "Contacto de emergencia creado correctamente",
      nuevoContacto: newEmergencyContact,
      exito: true
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al crear contacto de emergencia",
      error: error.message,
      exito: false
    });
  }
};

exports.getEmergencyContact = async (req, res) => {
  try {
    const idContactoEmergencia = req.params.id;
    const contactoEmergencia = await emergencyContactService.getEmergencyContact(idContactoEmergencia);
    if (!contactoEmergencia) {
      return res.status(404).json({ error: "Contacto de emergencia no encontrado" });
    }
    res.json(contactoEmergencia);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateEmergencyContact = async (req, res) => {
  try {
    const idContactoEmergencia = req.params.id;
    const { relative_id, first_name, last_name, phone } = req.body;
    const contactoEmergenciaActualizado = await emergencyContactService.updateEmergencyContact(idContactoEmergencia, relative_id, first_name, last_name, phone);
    res.json({
      mensaje: "Contacto de emergencia actualizado correctamente",
      contactoEmergenciaActualizado
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al actualizar contacto de emergencia",
      error: error.message
    });
  }
};

exports.deleteEmergencyContact = async (req, res) => {
  try {
    const idContactoEmergencia = req.params.id;
    await emergencyContactService.deleteEmergencyContact(idContactoEmergencia);
    res.json({ mensaje: "Contacto de emergencia eliminado correctamente" });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar contacto de emergencia",
      error: error.message
    });
  }
};

exports.getAllEmergencyContacts = async (req, res) => {
  try {
    const contactosEmergencia = await emergencyContactService.getAllEmergencyContacts();
    res.json(contactosEmergencia);
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al obtener todos los contactos de emergencia",
      error: error.message
    });
  }
};
