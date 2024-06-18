// controllers/LaboratoryController.js
const laboratoryService = require("../services/laboratory.service");

exports.createLaboratory = async (req, res) => {
  try {
    const {
      medical_consult_id,
      exam_type,
      exam,
      date,
      result,
      pathology_report
    } = req.body;

    const newLaboratory = await laboratoryService.createLaboratory(
      medical_consult_id,
      exam_type,
      exam,
      date,
      result,
      pathology_report
    );

    res.status(200).json({
      mensaje: "Laboratorio creado correctamente",
      nuevoLaboratorio: newLaboratory,
      exito: true
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al crear laboratorio",
      error: error.message,
      exito: false
    });
  }
};

exports.getLaboratory = async (req, res) => {
  try {
    const idLaboratorio = req.params.id;
    const laboratorio = await laboratoryService.getLaboratory(idLaboratorio);

    if (!laboratorio) {
      return res.status(404).json({ error: "Laboratorio no encontrado" });
    }

    res.json(laboratorio);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllLaboratories = async (req, res) => {
  try {
    const laboratorios = await laboratoryService.getAllLaboratories();
    res.json(laboratorios);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateLaboratory = async (req, res) => {
  try {
    const idLaboratorio = req.params.id;
    const {
      medical_consult_id,
      exam_type,
      exam,
      date,
      result,
      pathology_report
    } = req.body;

    const laboratorioActualizado = await laboratoryService.updateLaboratory(
      idLaboratorio,
      medical_consult_id,
      exam_type,
      exam,
      date,
      result,
      pathology_report
    );

    res.json(laboratorioActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteLaboratory = async (req, res) => {
  try {
    const idLaboratorio = req.params.id;
    await laboratoryService.deleteLaboratory(idLaboratorio);

    res.json({ mensaje: "Laboratorio eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
