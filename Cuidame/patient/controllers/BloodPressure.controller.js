const BloodPressureService = require('../services/BloodPressure.service');

exports.createBloodPressure = async (req, res) => {
  const { patient_id, systolic, diastolic, date } = req.body;
  try {
    const bloodPressure = await BloodPressureService.createBloodPressure(patient_id, systolic, diastolic, date);
    res.status(201).json(bloodPressure);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBloodPressureByPatientId = async (req, res) => {
  try {
    const patient_id = req.params.patient_id;
    const bloodPressureMetrics = await BloodPressureService.getBloodPressureByPatientId(patient_id);
    return res.status(200).json({ bloodPressureMetrics, success: true });
  } catch (error) {
    res.status(400).json({ message: "Error al obtener métricas de presión arterial.", error: error.message, success: false });
  }
};


exports.getBloodPressure = async (req, res) => {
  const { id } = req.params;
  try {
    const bloodPressure = await BloodPressureService.getBloodPressure(id);
    if (!bloodPressure) {
      res.status(404).json({ message: 'Blood pressure record not found' });
    } else {
      res.status(200).json(bloodPressure);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllBloodPressures = async (req, res) => {
  try {
    const bloodPressures = await BloodPressureService.getAllBloodPressures();
    res.status(200).json(bloodPressures);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBloodPressure = async (req, res) => {
  const { id } = req.params;
  const { systolic, diastolic, date } = req.body;
  try {
    const bloodPressure = await BloodPressureService.updateBloodPressure(id, systolic, diastolic, date);
    if (!bloodPressure) {
      res.status(404).json({ message: 'Blood pressure record not found' });
    } else {
      res.status(200).json(bloodPressure);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBloodPressure = async (req, res) => {
  const { id } = req.params;
  try {
    const success = await BloodPressureService.deleteBloodPressure(id);
    if (success) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Blood pressure record not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
