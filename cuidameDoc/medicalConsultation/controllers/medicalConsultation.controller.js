// controllers/MedicalConsultationController.js
const medicalConsultationService = require("../services/medicalConsultation.service");

exports.createMedicalConsultation = async (req, res) => {
  try {
    const {
      relative_id,
      type,
      city_id,
      date,
      reason
    } = req.body;

    const newConsultation = await medicalConsultationService.createMedicalConsultation(
      relative_id,
      type,
      city_id,
      date,
      reason
    );

    res.status(200).json({
      mensaje: "Consulta médica creada correctamente",
      nuevaConsulta: newConsultation,
      exito: true
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al crear consulta médica",
      error: error.message,
      exito: false
    });
  }
};

exports.getMedicalConsultation = async (req, res) => {
  try {
    const idConsulta = req.params.id;
    const consulta = await medicalConsultationService.getMedicalConsultation(idConsulta);

    if (!consulta) {
      return res.status(404).json({ error: "Consulta médica no encontrada" });
    }

    res.json(consulta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllMedicalConsultations = async (req, res) => {
  try {
    const consultas = await medicalConsultationService.getAllMedicalConsultations();
    res.json(consultas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateMedicalConsultation = async (req, res) => {
  try {
    const idConsulta = req.params.id;
    const {
      relative_id,
      type,
      city_id,
      date,
      reason
    } = req.body;

    const consultaActualizada = await medicalConsultationService.updateMedicalConsultation(
      idConsulta,
      relative_id,
      type,
      city_id,
      date,
      reason
    );

    res.json(consultaActualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteMedicalConsultation = async (req, res) => {
  try {
    const idConsulta = req.params.id;
    await medicalConsultationService.deleteMedicalConsultation(idConsulta);

    res.json({ mensaje: "Consulta médica eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
