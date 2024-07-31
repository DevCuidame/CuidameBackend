// controllers/AllergyController.js
const allergyService = require("../../services/relative/allergy.service");

exports.createAllergy = async (req, res) => {
  try {
    const data = req.body;
    const newAllergy = await allergyService.createAllergy(data);

    return res.status(200).json({
      message: "Alergia creada correctamente",
      newAllergy: newAllergy,
      success: true
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error al crear la alergia",
      error: error.message,
      success: false
    });
  }
};

exports.getAllergy = async (req, res) => {
  try {
    const id = req.params.id;
    const allergy = await allergyService.getAllergy(id);

    if (!allergy) {
      return res.status(404).json({ error: "Alergia no encontrada", success: false });
    }

    return res.status(200).json({ allergy, success: true });
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};

exports.getAllAllergies = async (req, res) => {
  try {
    const allergies = await allergyService.getAllAllergies();
    return res.status(200).json({ allergies, success: true });
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};

exports.updateAllergy = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedAllergy = await allergyService.updateAllergy(id, data);

    return res.status(200).json({ updatedAllergy, success: true });
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};

exports.deleteAllergy = async (req, res) => {
  try {
    const id = req.params.id;
    await allergyService.deleteAllergy(id);

    return res.status(200).json({ message: "Alergia eliminada correctamente", success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message, success: false });
  }
};
