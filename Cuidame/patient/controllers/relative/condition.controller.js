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

exports.updateCondition = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedCondition = await conditionService.updateCondition(id, data);

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
