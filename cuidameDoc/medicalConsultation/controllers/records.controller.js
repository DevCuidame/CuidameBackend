// controllers/RecordsController.js
const recordsService = require("../services/records.service");

exports.createRecord = async (req, res) => {
  try {
    const {
      medical_consult_id,
      type,
      date,
      description
    } = req.body;

    const newRecord = await recordsService.createRecord(
      medical_consult_id,
      type,
      date,
      description
    );

    res.status(200).json({
      mensaje: "Registro creado correctamente",
      nuevoRegistro: newRecord,
      exito: true
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al crear registro",
      error: error.message,
      exito: false
    });
  }
};

exports.getRecord = async (req, res) => {
  try {
    const idRegistro = req.params.id;
    const registro = await recordsService.getRecord(idRegistro);

    if (!registro) {
      return res.status(404).json({ error: "Registro no encontrado" });
    }

    res.json(registro);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllRecords = async (req, res) => {
  try {
    const registros = await recordsService.getAllRecords();
    res.json(registros);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateRecord = async (req, res) => {
  try {
    const idRegistro = req.params.id;
    const {
      medical_consult_id,
      type,
      date,
      description
    } = req.body;

    const registroActualizado = await recordsService.updateRecord(
      idRegistro,
      medical_consult_id,
      type,
      date,
      description
    );

    res.json(registroActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteRecord = async (req, res) => {
  try {
    const idRegistro = req.params.id;
    await recordsService.deleteRecord(idRegistro);

    res.json({ mensaje: "Registro eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
