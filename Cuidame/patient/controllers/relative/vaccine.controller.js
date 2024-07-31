// controllers/VaccineController.js
const vaccineService = require("../../services/relative/vaccine.service");

exports.createVaccine = async (req, res) => {
  try {
    const data = req.body;
    const newVaccine = await vaccineService.createVaccine(data);

    return res.status(200).json({
      message: "Vacuna creada correctamente",
      newVaccine: newVaccine,
      success: true
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error al crear la vacuna",
      error: error.message,
      success: false
    });
  }
};

exports.getVaccine = async (req, res) => {
  try {
    const id = req.params.id;
    const vaccine = await vaccineService.getVaccine(id);

    if (!vaccine) {
      return res.status(404).json({ error: "Vacuna no encontrada", success: false });
    }

    return res.status(200).json({ vaccine, success: true });
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};

exports.getAllVaccines = async (req, res) => {
  try {
    const vaccines = await vaccineService.getAllVaccines();
    return res.status(200).json({ vaccines, success: true });
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};

exports.updateVaccine = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedVaccine = await vaccineService.updateVaccine(id, data);

    return res.status(200).json({ updatedVaccine, success: true });
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};

exports.deleteVaccine = async (req, res) => {
  try {
    const id = req.params.id;
    await vaccineService.deleteVaccine(id);

    return res.status(200).json({ message: "Vacuna eliminada correctamente", success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message, success: false });
  }
};
