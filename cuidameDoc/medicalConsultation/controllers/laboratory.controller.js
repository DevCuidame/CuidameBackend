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

    return res.status(200).json({
      message: "Laboratorio creado correctamente",
      newLaboratory: newLaboratory,
      exito: true
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error al crear laboratorio",
      error: error.message,
      exito: false
    });
  }
};

exports.getLaboratory = async (req, res) => {
  try {
    const idLaboratory = req.params.id;
    const laboratory = await laboratoryService.getLaboratory(idLaboratory);

    if (!laboratory) {
      return res.status(404).json({ error: "Laboratorio no encontrado" });
    }

    return res.status(200).json(laboratory);
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false});
  }
};

exports.getAllLaboratories = async (req, res) => {
  try {
    const laboratories = await laboratoryService.getAllLaboratories();
    return res.status(200).json(laboratories);
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false});
  }
};

exports.updateLaboratory = async (req, res) => {
  try {
    const idLaboratory = req.params.id;
    const {
      medical_consult_id,
      exam_type,
      exam,
      date,
      result,
      pathology_report
    } = req.body;

    const updatedLaboratory = await laboratoryService.updateLaboratory(
      idLaboratory,
      medical_consult_id,
      exam_type,
      exam,
      date,
      result,
      pathology_report
    );

    return res.status(200).json(updatedLaboratory);
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false});
  }
};

exports.deleteLaboratory = async (req, res) => {
  try {
    const idLaboratory = req.params.id;
    await laboratoryService.deleteLaboratory(idLaboratory);

    return res.status(200).json({ message: "Laboratorio eliminado correctamente", success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message, success: false});
  }
};
