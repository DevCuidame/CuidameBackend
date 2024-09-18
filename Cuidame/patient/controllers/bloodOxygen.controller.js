// path: src/controllers/bloodOxygen.controller.js
const BloodOxygenService = require('../services/bloodOxygen.service');

exports.createBloodOxygen = async (req, res) => {
  const { patient_id, rate, date } = req.body;
  try {
    const bloodOxygen = await BloodOxygenService.createBloodOxygen(patient_id, rate, date);
    res.status(201).json(bloodOxygen);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBloodOxygenByPatientId = async (req, res) => {
  try {
    const patient_id = req.params.patient_id;
    const bloodOxygenMetrics = await BloodOxygenService.getBloodOxygenByPatientId(patient_id);
    return res.status(200).json({ bloodOxygenMetrics, success: true });
  } catch (error) {
    res.status(400).json({ message: "Error al obtener métricas de oxígeno en sangre.", error: error.message, success: false });
  }
};

exports.getBloodOxygen = async (req, res) => {
  const { id } = req.params;
  try {
    const bloodOxygen = await BloodOxygenService.getBloodOxygen(id);
    if (!bloodOxygen) {
      res.status(404).json({ message: 'Blood oxygen record not found' });
    } else {
      res.status(200).json(bloodOxygen);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllBloodOxygens = async (req, res) => {
  try {
    const bloodOxygens = await BloodOxygenService.getAllBloodOxygens();
    res.status(200).json(bloodOxygens);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBloodOxygen = async (req, res) => {
  const { id } = req.params;
  const { rate, date } = req.body;
  try {
    const bloodOxygen = await BloodOxygenService.updateBloodOxygen(id, rate, date);
    if (!bloodOxygen) {
      res.status(404).json({ message: 'Blood oxygen record not found' });
    } else {
      res.status(200).json(bloodOxygen);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBloodOxygen = async (req, res) => {
  const { id } = req.params;
  try {
    const success = await BloodOxygenService.deleteBloodOxygen(id);
    if (success) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Blood oxygen record not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
