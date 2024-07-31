// controllers/RelativeAntecedentController.js
const relativeAntecedentService = require("../../services/relative/relativesAntecedent.service");

exports.createRelativeAntecedent = async (req, res) => {
  try {
    const data = req.body;
    const newRelativeAntecedent = await relativeAntecedentService.createRelativeAntecedent(data);

    return res.status(200).json({
      message: "Antecedente familiar creado correctamente",
      newRelativeAntecedent: newRelativeAntecedent,
      success: true
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error al crear el antecedente familiar",
      error: error.message,
      success: false
    });
  }
};

exports.getRelativeAntecedent = async (req, res) => {
  try {
    const id = req.params.id;
    const relativeAntecedent = await relativeAntecedentService.getRelativeAntecedent(id);

    if (!relativeAntecedent) {
      return res.status(404).json({ error: "Antecedente familiar no encontrado", success: false });
    }

    return res.status(200).json({ relativeAntecedent, success: true });
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};

exports.getAllRelativeAntecedents = async (req, res) => {
  try {
    const relativeAntecedents = await relativeAntecedentService.getAllRelativeAntecedents();
    return res.status(200).json({ relativeAntecedents, success: true });
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};

exports.updateRelativeAntecedent = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedRelativeAntecedent = await relativeAntecedentService.updateRelativeAntecedent(id, data);

    return res.status(200).json({ updatedRelativeAntecedent, success: true });
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};

exports.deleteRelativeAntecedent = async (req, res) => {
  try {
    const id = req.params.id;
    await relativeAntecedentService.deleteRelativeAntecedent(id);

    return res.status(200).json({ message: "Antecedente familiar eliminado correctamente", success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message, success: false });
  }
};
