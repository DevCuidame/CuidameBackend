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

    return res.status(200).json({
      mensaje: "Diagnóstico creado correctamente",
      newDiagnostic: newDiagnostic,
      exito: true
    });
  } catch (error) {
    return res.status(400).json({
      mensaje: "Error al crear diagnóstico",
      error: error.message,
      exito: false
    });
  }
};

exports.getDiagnostic = async (req, res) => {
  try {
    const idDiagnostic = req.params.id;
    const diagnostic = await diagnosticService.getDiagnostic(idDiagnostic);

    if (!diagnostic) {
      return res.status(404).json({ error: "Diagnóstico no encontrado" , success: false});
    }

    return res.status(200).json({diagnostic, success: true});
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false});
  }
};

exports.getAllDiagnostics = async (req, res) => {
  try {
    const diagnostics = await diagnosticService.getAllDiagnostics();
    return res.status(200).json({diagnostics, success: true});
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false});
  }
};

exports.updateDiagnostic = async (req, res) => {
  try {
    const idDiagnostic = req.params.id;
    const {
      medical_consult_id,
      diagnostic,
      epicrisis
    } = req.body;

    const diagnosticActualizado = await diagnosticService.updateDiagnostic(
      idDiagnostic,
      medical_consult_id,
      diagnostic,
      epicrisis
    );

    return res.status(200).json({diagnosticActualizado, success: true});
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false});
  }
};

exports.deleteDiagnostic = async (req, res) => {
  try {
    const idDiagnostic = req.params.id;
    await diagnosticService.deleteDiagnostic(idDiagnostic);

    return res.status(200).json({ mensaje: "Diagnóstico eliminado correctamente", success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message, success: false});
  }
};
