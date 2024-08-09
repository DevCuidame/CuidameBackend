// controllers/ConditionController.js
const conditionService = require("../../services/relative/condition.service");

exports.createCondition = async (req, res) => {
  try {
    const data = req.body;
    const newCondition = await conditionService.createCondition(data);

    return res.status(200).json({
      message: "Condición creada correctamente",
      newCondition: newCondition,
      success: true
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error al crear la condición",
      error: error.message,
      success: false
    });
  }
};

exports.getCondition = async (req, res) => {
  try {
    const id = req.params.id;
    const condition = await conditionService.getCondition(id);

    if (!condition) {
      return res.status(404).json({ error: "Condición no encontrada", success: false });
    }

    return res.status(200).json({ condition, success: true });
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};

exports.getAllConditions = async (req, res) => {
  try {
    const conditions = await conditionService.getAllConditions();
    return res.status(200).json({ conditions, success: true });
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};

exports.updateConditionByRelative = async (req, res) => {
  try {
    const id_paciente = req.params.id;
    const conditionData = req.body[0]; // Acceder al primer objeto del array

    const { cicatrices, tatuajes, discapacidad, embarazada } = conditionData;

    const data = {
      cicatrices_descripcion: cicatrices,
      tatuajes_descripcion: tatuajes,
      discapacidad: discapacidad,
      embarazada: embarazada,
      updated_at: new Date(),
      id_paciente, 
      created_at: new Date()
    };

    const existingCondition = await conditionService.getConditionByRelative(id_paciente);

    let updatedCondition;

    if (!existingCondition || existingCondition.length === 0) {
      updatedCondition = await conditionService.createCondition(data);
    } else {
      updatedCondition = await conditionService.updateCondition(id_paciente, data);
    }

    return res.status(200).json({ updatedCondition, success: true });
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};




exports.deleteCondition = async (req, res) => {
  try {
    const id = req.params.id;
    await conditionService.deleteCondition(id);

    return res.status(200).json({ message: "Condición eliminada correctamente", success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message, success: false });
  }
};
