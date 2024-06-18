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

    res.status(200).json({
      mensaje: "Registro familiar creado correctamente",
      nuevoRegistroFamiliar: newFamiliarRecord,
      exito: true
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al crear registro familiar",
      error: error.message,
      exito: false
    });
  }
};

exports.getFamiliarRecord = async (req, res) => {
  try {
    const idRegistroFamiliar = req.params.id;
    const registroFamiliar = await familiarRecordsService.getFamiliarRecord(idRegistroFamiliar);

    if (!registroFamiliar) {
      return res.status(404).json({ error: "Registro familiar no encontrado" });
    }

    res.json(registroFamiliar);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllFamiliarRecords = async (req, res) => {
  try {
    const registrosFamiliares = await familiarRecordsService.getAllFamiliarRecords();
    res.json(registrosFamiliares);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateFamiliarRecord = async (req, res) => {
  try {
    const idRegistroFamiliar = req.params.id;
    const {
      medical_consult_id,
      relative,
      diagnostic,
      records,
      hemorrhagic,
      thrombotic,
      oncological
    } = req.body;

    const registroFamiliarActualizado = await familiarRecordsService.updateFamiliarRecord(
      idRegistroFamiliar,
      medical_consult_id,
      relative,
      diagnostic,
      records,
      hemorrhagic,
      thrombotic,
      oncological
    );

    res.json(registroFamiliarActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteFamiliarRecord = async (req, res) => {
  try {
    const idRegistroFamiliar = req.params.id;
    await familiarRecordsService.deleteFamiliarRecord(idRegistroFamiliar);

    res.json({ mensaje: "Registro familiar eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
