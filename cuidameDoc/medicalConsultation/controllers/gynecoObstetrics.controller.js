// controllers/GynecoObstetricsController.js
const gynecoObstetricsService = require('../services/gynecoObstetrics.service');

exports.createGynecoObstetrics = async (req, res) => {
  try {
    const {
      medical_consult_id,
      births,
      abortions,
      cesarean,
      gestations,
      menstrual_cycles,
      family_planning
    } = req.body;

    const newGynecoObstetrics = await gynecoObstetricsService.createGynecoObstetrics(
      medical_consult_id,
      births,
      abortions,
      cesarean,
      gestations,
      menstrual_cycles,
      family_planning
    );

    res.status(200).json({
      message: "Datos de ginecología y obstetricia creados correctamente",
      newGynecoObstetrics,
      success: true
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al crear datos de ginecología y obstetricia",
      error: error.message,
      success: false
    });
  }
};

exports.getGynecoObstetrics = async (req, res) => {
  try {
    const gynecoObstetrics = await gynecoObstetricsService.getGynecoObstetrics(req.params.id);

    if (!gynecoObstetrics) {
      return res.status(404).json({ message: "Datos de ginecología y obstetricia no encontrados" });
    }

    res.json(gynecoObstetrics);
  } catch (error) {
    res.status(400).json({ message: "Error al obtener datos de ginecología y obstetricia", error: error.message });
  }
};

exports.getAllGynecoObstetrics = async (req, res) => {
  try {
    const gynecoObstetricsList = await gynecoObstetricsService.getAllGynecoObstetrics();
    res.json(gynecoObstetricsList);
  } catch (error) {
    res.status(400).json({ message: "Error al obtener todos los datos de ginecología y obstetricia", error: error.message });
  }
};

exports.updateGynecoObstetrics = async (req, res) => {
  try {
    const {
      medical_consult_id,
      births,
      abortions,
      cesarean,
      gestations,
      menstrual_cycles,
      family_planning
    } = req.body;

    const updatedGynecoObstetrics = await gynecoObstetricsService.updateGynecoObstetrics(
      req.params.id,
      medical_consult_id,
      births,
      abortions,
      cesarean,
      gestations,
      menstrual_cycles,
      family_planning
    );

    res.json(updatedGynecoObstetrics);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar datos de ginecología y obstetricia", error: error.message });
  }
};

exports.deleteGynecoObstetrics = async (req, res) => {
  try {
    await gynecoObstetricsService.deleteGynecoObstetrics(req.params.id);
    res.json({ message: "Datos de ginecología y obstetricia eliminados correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar datos de ginecología y obstetricia", error: error.message });
  }
};
