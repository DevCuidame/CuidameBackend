// path: src/controllers/bloodGlucose.controller.js
const BloodGlucoseService = require('../services/bloodGlucose.service');

exports.createBloodGlucose = async (req, res) => {
  const { patient_id, rate, date } = req.body;
  try {
    const bloodGlucose = await BloodGlucoseService.createBloodGlucose(patient_id, rate, date);
    res.status(201).json(bloodGlucose);
  } catch (error) {
    console.log("🚀 ~ exports.createBloodGlucose= ~ error:", error)
    res.status(500).json({ error: error.message });
  }
};

exports.getBloodGlucoseByPatientId = async (req, res) => {
  try {
    const patient_id = req.params.patient_id;
    const bloodGlucoseMetrics = await BloodGlucoseService.getBloodGlucoseByPatientId(patient_id);
    return res.status(200).json({ bloodGlucoseMetrics, success: true });
  } catch (error) {
    res.status(400).json({ message: "Error al obtener métricas de glucosa en sangre.", error: error.message, success: false });
  }
};

exports.getBloodGlucose = async (req, res) => {
  const { id } = req.params;
  try {
    const bloodGlucose = await BloodGlucoseService.getBloodGlucose(id);
    if (!bloodGlucose) {
      res.status(404).json({ message: 'Blood glucose record not found' });
    } else {
      res.status(200).json(bloodGlucose);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllBloodGlucoses = async (req, res) => {
  try {
    const bloodGlucoses = await BloodGlucoseService.getAllBloodGlucoses();
    res.status(200).json(bloodGlucoses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBloodGlucose = async (req, res) => {
  const { id } = req.params;
  const { rate, date } = req.body;
  try {
    const bloodGlucose = await BloodGlucoseService.updateBloodGlucose(id, rate, date);
    if (!bloodGlucose) {
      res.status(404).json({ message: 'Blood glucose record not found' });
    } else {
      res.status(200).json(bloodGlucose);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBloodGlucose = async (req, res) => {
  const { id } = req.params;
  try {
    const success = await BloodGlucoseService.deleteBloodGlucose(id);
    if (success) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Blood glucose record not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
