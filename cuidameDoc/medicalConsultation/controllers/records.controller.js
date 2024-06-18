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

    return res.status(200).json({
      messange: "Registro creado correctamente",
      nuevoRegistro: newRecord,
      success: true
    });
  } catch (error) {
    return res.status(400).json({
      messange: "Error al crear registro",
      error: error.message,
      success: false
    });
  }
};

exports.getRecord = async (req, res) => {
  try {
    const idRecord = req.params.id;
    const record = await recordsService.getRecord(idRecord);

    if (!record) {
      return res.status(404).json({ error: "Registro no encontrado", success: false });
    }

    return res.status(200).json({record, success: true});
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false});
  }
};

exports.getAllRecords = async (req, res) => {
  try {
    const records = await recordsService.getAllRecords();
    return res.status(200).json({records, success: true});
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false});
  }
};

exports.updateRecord = async (req, res) => {
  try {
    const idRecord = req.params.id;
    const {
      medical_consult_id,
      type,
      date,
      description
    } = req.body;

    const updatedRecord = await recordsService.updateRecord(
      idRecord,
      medical_consult_id,
      type,
      date,
      description
    );

    return res.status(200).json({updatedRecord, success: true});
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false});
  }
};

exports.deleteRecord = async (req, res) => {
  try {
    const idRecord = req.params.id;
    await recordsService.deleteRecord(idRecord);

    return res.status(200).json({ messange: "Registro eliminado correctamente", success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message, success: false});
  }
};
