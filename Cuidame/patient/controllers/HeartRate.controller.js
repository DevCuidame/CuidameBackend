const HeartRateService = require('../services/HeartRate.service');

exports.createHeartRate = async (req, res) => {
  const { patient_id, rate, date } = req.body;
  try {
    const heartRate = await HeartRateService.createHeartRate(patient_id, rate, date);
    res.status(201).json(heartRate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getHeartRateByPatientId = async (req, res) => {
  try {
    const patient_id = req.params.patient_id;
    const heartRateMetrics = await HeartRateService.getHeartRateByPatientId(patient_id);
    return res.status(200).json({ heartRateMetrics, success: true });
  } catch (error) {
    res.status(400).json({ message: "Error al obtener métricas de ritmo cardíaco.", error: error.message, success: false });
  }
};


exports.getHeartRate = async (req, res) => {
  const { id } = req.params;
  try {
    const heartRate = await HeartRateService.getHeartRate(id);
    if (!heartRate) {
      res.status(404).json({ message: 'Heart rate record not found' });
    } else {
      res.status(200).json(heartRate);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllHeartRates = async (req, res) => {
  try {
    const heartRates = await HeartRateService.getAllHeartRates();
    res.status(200).json(heartRates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateHeartRate = async (req, res) => {
  const { id } = req.params;
  const { rate, date } = req.body;
  try {
    const heartRate = await HeartRateService.updateHeartRate(id, rate, date);
    if (!heartRate) {
      res.status(404).json({ message: 'Heart rate record not found' });
    } else {
      res.status(200).json(heartRate);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteHeartRate = async (req, res) => {
  const { id } = req.params;
  try {
    const success = await HeartRateService.deleteHeartRate(id);
    if (success) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Heart rate record not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
