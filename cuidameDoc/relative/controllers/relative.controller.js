// controllers/RelativeController.js
const relativeService = require("../services/relative.service");

exports.createRelative = async (req, res) => {
  try {
    const {
      user_id, doctor_id, first_name, last_name, identification_type, identification_number,
      age, gender, marital_status, place_of_birth, city_id, address, phone, occupation,
      position, health_insurance_id, company_id, status
    } = req.body;

    const exists = await relativeService.getRelativeByCard(identification_number);

    if (exists) {
      return res.status(400).json({
        message: "Familiar ya existe",
        success: false
      });
    }
    
    const newRelative = await relativeService.createRelative(
      user_id, doctor_id, first_name, last_name, identification_type, identification_number,
      age, gender, marital_status, place_of_birth, city_id, address, phone, occupation,
      position, health_insurance_id, company_id, status
    );

    return res.status(200).json({
      message: "Familiar creado correctamente",
      newRelative: newRelative,
      success: true
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error al crear familiar",
      error: error.message,
      success: false
    });
  }
};

exports.getRelative = async (req, res) => {
  try {
    const idRelative = req.params.id;
    const relative = await relativeService.getRelative(idRelative);
    if (!relative) {
      return res.status(404).json({ error: "Familiar no encontrado" });
    }
    return res.status(200).json({relative, success: true});
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};

exports.updateRelative = async (req, res) => {
  try {
    const idRelative = req.params.id;
    const {
      user_id, doctor_id, first_name, last_name, identification_type, identification_number,
      age, gender, marital_status, place_of_birth, city_id, address, phone, occupation,
      position, health_insurance_id, company_id, status
    } = req.body;

    const exists = await relativeService.getRelativeByCard(identification_number);

    if (exists) {
      return res.status(400).json({
        message: "Familiar ya existe",
        success: false
      });
    }

    const updatedRelative = await relativeService.updateRelative(
      idRelative, user_id, doctor_id, first_name, last_name, identification_type, identification_number,
      age, gender, marital_status, place_of_birth, city_id, address, phone, occupation,
      position, health_insurance_id, company_id, status
    );

    return res.status(200).json({
      message: "Familiar actualizado correctamente",
      updatedRelative, success: true
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error al actualizar familiar",
      error: error.message, success: false
    });
  }
};

exports.deleteRelative = async (req, res) => {
  try {
    const idRelative = req.params.id;
    await relativeService.deleteRelative(idRelative);
    return res.status(200).json({ message: "Familiar eliminado correctamente" });
  } catch (error) {
    return res.status(500).json({
      message: "Error al eliminar familiar",
      error: error.message, success: false
    });
  }
};

exports.getAllRelatives = async (req, res) => {
  try {
    const relatives = await relativeService.getAllRelatives();
    return res.status(200).json({relatives, success: true});
  } catch (error) {
    return res.status(400).json({
      message: "Error al obtener todos los familiares",
      error: error.message, success: false
    });
  }
};
