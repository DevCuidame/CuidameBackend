// controllers/VitalSignalsController.js
const vitalSignalsService = require("../services/vitalSignals.service");

exports.createVitalSignals = async (req, res) => {
  try {
    const {
      medicalConsultId,
      weight,
      size,
      imc,
      bloodPressure,
      heartFrequency,
      system,
      bodyArea,
      symptom,
      description
    } = req.body;

    const newVitalSignal = await vitalSignalsService.createVitalSignals(
      medicalConsultId,
      weight,
      size,
      imc,
      bloodPressure,
      heartFrequency,
      system,
      bodyArea,
      symptom,
      description
    );

    res.status(200).json({
      mensaje: "Señal vital creada correctamente",
      nuevaSeñalVital: newVitalSignal,
      exito: true
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al crear señal vital",
      error: error.message,
      exito: false
    });
  }
};

exports.getVitalSignalsById = async (req, res) => {
  try {
    const idSeñalVital = req.params.id;
    const señalVital = await vitalSignalsService.getVitalSignalsById(idSeñalVital);

    if (!señalVital) {
      return res.status(404).json({ error: "Señal vital no encontrada" });
    }

    res.json(señalVital);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllVitalSignals = async (req, res) => {
  try {
    const todasLasSeñalesVitales = await vitalSignalsService.getAllVitalSignals();
    res.json(todasLasSeñalesVitales);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateVitalSignals = async (req, res) => {
  try {
    const idSeñalVital = req.params.id;
    const {
      medicalConsultId,
      weight,
      size,
      imc,
      bloodPressure,
      heartFrequency,
      system,
      bodyArea,
      symptom,
      description
    } = req.body;

    const señalVitalActualizada = await vitalSignalsService.updateVitalSignals(
      idSeñalVital,
      medicalConsultId,
      weight,
      size,
      imc,
      bloodPressure,
      heartFrequency,
      system,
      bodyArea,
      symptom,
      description
    );

    res.json(señalVitalActualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteVitalSignals = async (req, res) => {
  try {
    const idSeñalVital = req.params.id;
    await vitalSignalsService.deleteVitalSignals(idSeñalVital);

    res.json({ mensaje: "Señal vital eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
