const RespiratoryRateService = require('../services/RespiratoryRate.service');

exports.createRespiratoryRate = async (req, res) => {
  const { patient_id, rate, date } = req.body;
  try {
    const respiratoryRate = await RespiratoryRateService.createRespiratoryRate(patient_id, rate, date);
    res.status(201).json(respiratoryRate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRespiratoryRateByPatientId = async (req, res) => {
  try {
    const patient_id = req.params.patient_id;
    const respiratoryRateMetrics = await RespiratoryRateService.getRespiratoryRateByPatientId(patient_id);
    return res.status(200).json({ respiratoryRateMetrics, success: true });
  } catch (error) {
    res.status(400).json({ message: "Error al obtener métricas de frecuencia respiratoria.", error: error.message, success: false });
  }
};


exports.getRespiratoryRate = async (req, res) => {
  const { id } = req.params;
  try {
    const respiratoryRate = await RespiratoryRateService.getRespiratoryRate(id);
    if (!respiratoryRate) {
      res.status(404).json({ message: 'Respiratory rate record not found' });
    } else {
      res.status(200).json(respiratoryRate);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllRespiratoryRates = async (req, res) => {
  try {
    const respiratoryRates = await RespiratoryRateService.getAllRespiratoryRates();
    res.status(200).json(respiratoryRates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRespiratoryRate = async (req, res) => {
  const { id } = req.params;
  const { rate, date } = req.body;
  try {
    const respiratoryRate = await RespiratoryRateService.updateRespiratoryRate(id, rate, date);
    if (!respiratoryRate) {
      res.status(404).json({ message: 'Respiratory rate record not found' });
    } else {
      res.status(200).json(respiratoryRate);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteRespiratoryRate = async (req, res) => {
  const { id } = req.params;
  try {
    const success = await RespiratoryRateService.deleteRespiratoryRate(id);
    if (success) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Respiratory rate record not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
