// controllers/MedicamentController.js
const medicamentService = require("../../services/relative/medicament.service");

exports.createMedicament = async (req, res) => {
  try {
    const data = req.body;
    const newMedicament = await medicamentService.createMedicament(data);

    return res.status(200).json({
      message: "Medicamento creado correctamente",
      newMedicament: newMedicament,
      success: true
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error al crear el medicamento",
      error: error.message,
      success: false
    });
  }
};

exports.getMedicament = async (req, res) => {
  try {
    const id = req.params.id;
    const medicament = await medicamentService.getMedicament(id);

    if (!medicament) {
      return res.status(404).json({ error: "Medicamento no encontrado", success: false });
    }

    return res.status(200).json({ medicament, success: true });
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};

exports.getAllMedicaments = async (req, res) => {
  try {
    const medicaments = await medicamentService.getAllMedicaments();
    return res.status(200).json({ medicaments, success: true });
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};

exports.updateMedicament = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedMedicament = await medicamentService.updateMedicament(id, data);

    return res.status(200).json({ updatedMedicament, success: true });
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};

exports.deleteMedicament = async (req, res) => {
  try {
    const id = req.params.id;
    await medicamentService.deleteMedicament(id);

    return res.status(200).json({ message: "Medicamento eliminado correctamente", success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message, success: false });
  }
};
