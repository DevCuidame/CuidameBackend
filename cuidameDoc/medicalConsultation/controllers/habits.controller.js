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

    res.status(200).json({
      mensaje: "Hábitos creados correctamente",
      nuevosHabitos: newHabit,
      exito: true
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al crear hábitos",
      error: error.message,
      exito: false
    });
  }
};

exports.getHabits = async (req, res) => {
  try {
    const idHabitos = req.params.id;
    const habitos = await habitsService.getHabits(idHabitos);

    if (!habitos) {
      return res.status(404).json({ error: "Hábitos no encontrados" });
    }

    res.json(habitos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllHabits = async (req, res) => {
  try {
    const habitos = await habitsService.getAllHabits();
    res.json(habitos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateHabits = async (req, res) => {
  try {
    const idHabitos = req.params.id;
    const {
      medical_consult_id,
      smoke,
      liquor,
      other
    } = req.body;

    const habitosActualizados = await habitsService.updateHabits(
      idHabitos,
      medical_consult_id,
      smoke,
      liquor,
      other
    );

    res.json(habitosActualizados);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteHabits = async (req, res) => {
  try {
    const idHabitos = req.params.id;
    await habitsService.deleteHabits(idHabitos);

    res.json({ mensaje: "Hábitos eliminados correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
