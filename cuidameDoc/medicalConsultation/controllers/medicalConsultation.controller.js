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

    return res.status(200).json({
      message: "Consulta médica creada correctamente",
      newConsult: newConsultation,
      success: true
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error al crear consulta médica",
      error: error.message,
      success: false
    });
  }
};

exports.getMedicalConsultation = async (req, res) => {
  try {
    const idConsult = req.params.id;
    const consult = await medicalConsultationService.getMedicalConsultation(idConsult);

    if (!consult) {
      return res.status(404).json({ error: "Consulta médica no encontrada", success: false });
    }

    return res.status(200).json({consult, success: true});
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false});
  }
};

exports.getAllMedicalConsultations = async (req, res) => {
  try {
    const consults = await medicalConsultationService.getAllMedicalConsultations();
    return res.status(200).json({consults, success: true});
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false});
  }
};

exports.updateMedicalConsultation = async (req, res) => {
  try {
    const idConsult = req.params.id;
    const {
      relative_id,
      type,
      city_id,
      date,
      reason
    } = req.body;

    const updatedConsult = await medicalConsultationService.updateMedicalConsultation(
      idConsult,
      relative_id,
      type,
      city_id,
      date,
      reason
    );

    return res.status(200).json({updatedConsult, success: true});
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false});
  }
};

exports.deleteMedicalConsultation = async (req, res) => {
  try {
    const idConsult = req.params.id;
    await medicalConsultationService.deleteMedicalConsultation(idConsult);

    return res.status(200).json({ message: "Consulta médica eliminada correctamente", success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message, success: false});
  }
};
