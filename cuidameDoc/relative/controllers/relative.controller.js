// controllers/RelativeController.js
const relativeService = require("../services/relative.service");

exports.createRelative = async (req, res) => {
  try {
    const {
      user_id, doctor_id, first_name, last_name, identification_type, identification_number,
      age, gender, marital_status, place_of_birth, city_id, address, phone, occupation,
      position, health_insurance_id, company_id, status
    } = req.body;
    
    const newRelative = await relativeService.createRelative(
      user_id, doctor_id, first_name, last_name, identification_type, identification_number,
      age, gender, marital_status, place_of_birth, city_id, address, phone, occupation,
      position, health_insurance_id, company_id, status
    );

    res.status(200).json({
      mensaje: "Familiar creado correctamente",
      nuevoFamiliar: newRelative,
      exito: true
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al crear familiar",
      error: error.message,
      exito: false
    });
  }
};

exports.getRelative = async (req, res) => {
  try {
    const idFamiliar = req.params.id;
    const familiar = await relativeService.getRelative(idFamiliar);
    if (!familiar) {
      return res.status(404).json({ error: "Familiar no encontrado" });
    }
    res.json(familiar);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateRelative = async (req, res) => {
  try {
    const idFamiliar = req.params.id;
    const {
      user_id, doctor_id, first_name, last_name, identification_type, identification_number,
      age, gender, marital_status, place_of_birth, city_id, address, phone, occupation,
      position, health_insurance_id, company_id, status
    } = req.body;

    const familiarActualizado = await relativeService.updateRelative(
      idFamiliar, user_id, doctor_id, first_name, last_name, identification_type, identification_number,
      age, gender, marital_status, place_of_birth, city_id, address, phone, occupation,
      position, health_insurance_id, company_id, status
    );

    res.json({
      mensaje: "Familiar actualizado correctamente",
      familiarActualizado
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al actualizar familiar",
      error: error.message
    });
  }
};

exports.deleteRelative = async (req, res) => {
  try {
    const idFamiliar = req.params.id;
    await relativeService.deleteRelative(idFamiliar);
    res.json({ mensaje: "Familiar eliminado correctamente" });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar familiar",
      error: error.message
    });
  }
};

exports.getAllRelatives = async (req, res) => {
  try {
    const familiares = await relativeService.getAllRelatives();
    res.json(familiares);
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al obtener todos los familiares",
      error: error.message
    });
  }
};
