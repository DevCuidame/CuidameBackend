// controllers/DiagnosticController.js
const diagnosticService = require("../services/diagnostic.service");

exports.createDiagnostic = async (req, res) => {
  try {
    const {
      medical_consult_id,
      diagnostic,
      epicrisis
    } = req.body;

    const newDiagnostic = await diagnosticService.createDiagnostic(
      medical_consult_id,
      diagnostic,
      epicrisis
    );

    res.status(200).json({
      mensaje: "Diagnóstico creado correctamente",
      nuevoDiagnostico: newDiagnostic,
      exito: true
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al crear diagnóstico",
      error: error.message,
      exito: false
    });
  }
};

exports.getDiagnostic = async (req, res) => {
  try {
    const idDiagnostico = req.params.id;
    const diagnostico = await diagnosticService.getDiagnostic(idDiagnostico);

    if (!diagnostico) {
      return res.status(404).json({ error: "Diagnóstico no encontrado" });
    }

    res.json(diagnostico);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllDiagnostics = async (req, res) => {
  try {
    const diagnosticos = await diagnosticService.getAllDiagnostics();
    res.json(diagnosticos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateDiagnostic = async (req, res) => {
  try {
    const idDiagnostico = req.params.id;
    const {
      medical_consult_id,
      diagnostic,
      epicrisis
    } = req.body;

    const diagnosticActualizado = await diagnosticService.updateDiagnostic(
      idDiagnostico,
      medical_consult_id,
      diagnostic,
      epicrisis
    );

    res.json(diagnosticActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteDiagnostic = async (req, res) => {
  try {
    const idDiagnostico = req.params.id;
    await diagnosticService.deleteDiagnostic(idDiagnostico);

    res.json({ mensaje: "Diagnóstico eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
