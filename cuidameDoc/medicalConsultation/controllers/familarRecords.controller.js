// controllers/FamiliarRecordsController.js
const familiarRecordsService = require("../services/familarRecords.service");

exports.createFamiliarRecord = async (req, res) => {
  try {
    const {
      medical_consult_id,
      relative,
      diagnostic,
      records,
      hemorrhagic,
      thrombotic,
      oncological
    } = req.body;

    const newFamiliarRecord = await familiarRecordsService.createFamiliarRecord(
      medical_consult_id,
      relative,
      diagnostic,
      records,
      hemorrhagic,
      thrombotic,
      oncological
    );

    return res.status(200).json({
      message: "Registro familiar creado correctamente",
      newFamiliarRecord: newFamiliarRecord,
      success: true
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error al crear registro familiar",
      error: error.message,
      success: false
    });
  }
};

exports.getFamiliarRecord = async (req, res) => {
  try {
    const idFamiliarRecord = req.params.id;
    const familiarRecord = await familiarRecordsService.getFamiliarRecord(idFamiliarRecord);

    if (!familiarRecord) {
      return res.status(404).json({ error: "Registro familiar no encontrado", success: false });
    }

    return res.status(200).json({familiarRecord, success: true});
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false});
  }
};

exports.getAllFamiliarRecords = async (req, res) => {
  try {
    const familiarRecords = await familiarRecordsService.getAllFamiliarRecords();
    return res.status(200).json({familiarRecords, success: true});
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false});
  }
};

exports.updateFamiliarRecord = async (req, res) => {
  try {
    const idFamiliarRecord = req.params.id;
    const {
      medical_consult_id,
      relative,
      diagnostic,
      records,
      hemorrhagic,
      thrombotic,
      oncological
    } = req.body;

    const updatedFamiliarRecord = await familiarRecordsService.updateFamiliarRecord(
      idFamiliarRecord,
      medical_consult_id,
      relative,
      diagnostic,
      records,
      hemorrhagic,
      thrombotic,
      oncological
    );

    return res.status(200).json({updatedFamiliarRecord, success: true});
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false});
  }
};

exports.deleteFamiliarRecord = async (req, res) => {
  try {
    const idFamiliarRecord = req.params.id;
    await familiarRecordsService.deleteFamiliarRecord(idFamiliarRecord);

    return res.status(200).json({ message: "Registro familiar eliminado correctamente", success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message, success: false});
  }
};
