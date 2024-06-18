// controllers/EmergencyContactController.js
const emergencyContactService = require("../services/emergencyContact.service");

exports.createEmergencyContact = async (req, res) => {
  try {
    const { relative_id, first_name, last_name, phone } = req.body;
    const newEmergencyContact = await emergencyContactService.createEmergencyContact(relative_id, first_name, last_name, phone);
    res.status(200).json({
      message: "Contacto de emergencia creado correctamente",
      newContact: newEmergencyContact,
      success: true
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al crear contacto de emergencia",
      error: error.message,
      success: false
    });
  }
};

exports.getEmergencyContact = async (req, res) => {
  try {
    const idEmergencyContact = req.params.id;
    const emergencyContact = await emergencyContactService.getEmergencyContact(idEmergencyContact);
    if (!emergencyContact) {
      return res.status(404).json({ error: "Contacto de emergencia no encontrado" });
    }
    res.json({emergencyContact, success: true});
  } catch (error) {
    res.status(400).json({ error: error.message, success: false });
  }
};

exports.updateEmergencyContact = async (req, res) => {
  try {
    const idEmergencyContact = req.params.id;
    const { relative_id, first_name, last_name, phone } = req.body;
    const updatedEmergencyContact = await emergencyContactService.updateEmergencyContact(idEmergencyContact, relative_id, first_name, last_name, phone);
    res.json({
      message: "Contacto de emergencia actualizado correctamente",
      updatedEmergencyContact, success: true
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al actualizar contacto de emergencia",
      error: error.message, success: false
    });
  }
};

exports.deleteEmergencyContact = async (req, res) => {
  try {
    const idEmergencyContact = req.params.id;
    await emergencyContactService.deleteEmergencyContact(idEmergencyContact);
    res.json({ message: "Contacto de emergencia eliminado correctamente" , success: true});
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar contacto de emergencia",
      error: error.message, success: false
    });
  }
};

exports.getAllEmergencyContacts = async (req, res) => {
  try {
    const emergencyContacts = await emergencyContactService.getAllEmergencyContacts();
    res.json({emergencyContacts, success: true});
  } catch (error) {
    res.status(400).json({
      message: "Error al obtener todos los contactos de emergencia",
      error: error.message, success: false
    });
  }
};
