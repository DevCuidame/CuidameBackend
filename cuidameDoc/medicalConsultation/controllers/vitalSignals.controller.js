// controllers/VitalSignalsController.js
const vitalSignalsService = require("../services/vitalSignals.service");

exports.createVitalSignals = async (req, res) => {
  try {
    const {
      medical_consult_id,
      weight,
      size,
      imc,
      blood_pressure,
      heart_frequency,
      system,
      body_area,
      symptom,
      description
    } = req.body;

    const newVitalSignal = await vitalSignalsService.createVitalSignals(
      medical_consult_id,
      weight,
      size,
      imc,
      blood_pressure,
      heart_frequency,
      system,
      body_area,
      symptom,
      description
    );

    return res.status(200).json({
      message: "Signso vitales creados correctamente",
      nuevavitalSignal: newVitalSignal,
      success: true
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error al crear signos vitales",
      error: error.message,
      success: false
    });
  }
};

exports.getVitalSignalsById = async (req, res) => {
  try {
    const idVitalSignal = req.params.id;
    const vitalSignal = await vitalSignalsService.getVitalSignalsById(idVitalSignal);

    if (!vitalSignal) {
      return res.status(404).json({ error: "Signos vitales no encontrado", success: false });
    }

    return res.status(200).json({vitalSignal, success: true});
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false});
  }
};

exports.getAllVitalSignals = async (req, res) => {
  try {
    const todasLasSeñalesVitales = await vitalSignalsService.getAllVitalSignals();
    return res.status(200).json({todasLasSeñalesVitales, success: true});
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false});
  }
};

exports.updateVitalSignals = async (req, res) => {
  try {
    const idVitalSignal = req.params.id;
    const {
      medical_consult_id,
      weight,
      size,
      imc,
      blood_pressure,
      heart_frequency,
      system,
      body_area,
      symptom,
      description
    } = req.body;

    const updatedSignalVital = await vitalSignalsService.updateVitalSignals(
      idVitalSignal,
      medical_consult_id,
      weight,
      size,
      imc,
      blood_pressure,
      heart_frequency,
      system,
      body_area,
      symptom,
      description
    );

    return res.status(200).json({updatedSignalVital, success: true});
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false});
  }
};

exports.deleteVitalSignals = async (req, res) => {
  try {
    const idVitalSignal = req.params.id;
    await vitalSignalsService.deleteVitalSignals(idVitalSignal);

    return res.status(200).json({ message: "Signos vitales eliminados correctamente", success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message, success: false});
  }
};
