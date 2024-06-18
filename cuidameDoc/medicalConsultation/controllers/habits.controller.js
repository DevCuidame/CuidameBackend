// controllers/HabitsController.js
const habitsService = require("../services/habits.service");

exports.createHabits = async (req, res) => {
  try {
    const {
      medical_consult_id,
      smoke,
      liquor,
      other
    } = req.body;

    const newHabit = await habitsService.createHabits(
      medical_consult_id,
      smoke,
      liquor,
      other
    );

    return res.status(200).json({
      message: "Hábitos creados correctamente",
      newHabits: newHabit,
      success: true
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error al crear hábitos",
      error: error.message,
      success: false
    });
  }
};

exports.getHabits = async (req, res) => {
  try {
    const idhabits = req.params.id;
    const habits = await habitsService.getHabits(idhabits);

    if (!habits) {
      return res.status(404).json({ error: "Hábitos no encontrados", success: false });
    }

    return res.status(200).json({habits, success: true});
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false});
  }
};

exports.getAllHabits = async (req, res) => {
  try {
    const habits = await habitsService.getAllHabits();
    return res.status(200).json({habits, success: true});
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false});
  }
};

exports.updateHabits = async (req, res) => {
  try {
    const idhabits = req.params.id;
    const {
      medical_consult_id,
      smoke,
      liquor,
      other
    } = req.body;

    const updatedHabits = await habitsService.updateHabits(
      idhabits,
      medical_consult_id,
      smoke,
      liquor,
      other
    );

    return res.status(200).json({updatedHabits, success: true});
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false});
  }
};

exports.deleteHabits = async (req, res) => {
  try {
    const idhabits = req.params.id;
    await habitsService.deleteHabits(idhabits);

    return res.status(200).json({ message: "Hábitos eliminados correctamente", success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message, success: false});
  }
};
