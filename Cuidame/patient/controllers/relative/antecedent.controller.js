// controllers/AntecedentController.js
const antecedentService = require("../../services/relative/antecedent.service");

exports.createAntecedent = async (req, res) => {
  try {
    const data = req.body;
    const newAntecedent = await antecedentService.createAntecedent(data);

    return res.status(200).json({
      message: "Antecedente creado correctamente",
      newAntecedent: newAntecedent,
      success: true
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error al crear el antecedente",
      error: error.message,
      success: false
    });
  }
};

exports.getAntecedent = async (req, res) => {
  try {
    const id = req.params.id;
    const antecedent = await antecedentService.getAntecedent(id);

    if (!antecedent) {
      return res.status(404).json({ error: "Antecedente no encontrado", success: false });
    }

    return res.status(200).json({ antecedent, success: true });
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};

exports.getAllAntecedents = async (req, res) => {
  try {
    const antecedents = await antecedentService.getAllAntecedents();
    return res.status(200).json({ antecedents, success: true });
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};

exports.updateAntecedent = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedAntecedent = await antecedentService.updateAntecedent(id, data);

    return res.status(200).json({ updatedAntecedent, success: true });
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};

exports.deleteAntecedent = async (req, res) => {
  try {
    const id = req.params.id;
    await antecedentService.deleteAntecedent(id);

    return res.status(200).json({ message: "Antecedente eliminado correctamente", success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message, success: false });
  }
};
