// controllers/DiseaseController.js
const diseaseService = require("../../services/relative/disease.service");

exports.createDisease = async (req, res) => {
  try {
    const data = req.body;
    const newDisease = await diseaseService.createDisease(data);

    return res.status(200).json({
      message: "Enfermedad creada correctamente",
      newDisease: newDisease,
      success: true
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error al crear la enfermedad",
      error: error.message,
      success: false
    });
  }
};

exports.getDisease = async (req, res) => {
  try {
    const id = req.params.id;
    const disease = await diseaseService.getDisease(id);

    if (!disease) {
      return res.status(404).json({ error: "Enfermedad no encontrada", success: false });
    }

    return res.status(200).json({ disease, success: true });
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};

exports.getAllDiseases = async (req, res) => {
  try {
    const diseases = await diseaseService.getAllDiseases();
    return res.status(200).json({ diseases, success: true });
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};

exports.updateDisease = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedDisease = await diseaseService.updateDisease(id, data);

    return res.status(200).json({ updatedDisease, success: true });
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};

exports.deleteDisease = async (req, res) => {
  try {
    const id = req.params.id;
    await diseaseService.deleteDisease(id);

    return res.status(200).json({ message: "Enfermedad eliminada correctamente", success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message, success: false });
  }
};
