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

    return res.status(200).json({
      message: "Datos de ginecología y obstetricia creados correctamente",
      newGynecoObstetrics,
      success: true
    });
  } catch (error) {
    return res.status(400).json({
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
      return res.status(404).json({ message: "Datos de ginecología y obstetricia no encontrados" , success: false});
    }

    return res.status(200).json({gynecoObstetrics, success: true});
  } catch (error) {
    return res.status(400).json({ message: "Error al obtener datos de ginecología y obstetricia", error: error.message, success: false});
  }
};

exports.getAllGynecoObstetrics = async (req, res) => {
  try {
    const gynecoObstetricsList = await gynecoObstetricsService.getAllGynecoObstetrics();
    return res.status(200).json({gynecoObstetricsList, success: true});
  } catch (error) {
    return res.status(400).json({ message: "Error al obtener todos los datos de ginecología y obstetricia", error: error.message, success: false});
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

    return res.status(200).json({updatedGynecoObstetrics, success: true});
  } catch (error) {
    return res.status(400).json({ message: "Error al actualizar datos de ginecología y obstetricia", error: error.message, success: false});
  }
};

exports.deleteGynecoObstetrics = async (req, res) => {
  try {
    await gynecoObstetricsService.deleteGynecoObstetrics(req.params.id);
    return res.status(200).json({ message: "Datos de ginecología y obstetricia eliminados correctamente" , success: true});
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar datos de ginecología y obstetricia", error: error.message, success: false});
  }
};
