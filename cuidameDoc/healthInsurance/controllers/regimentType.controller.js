// controllers/RegimentTypeController.js
const regimentTypeService = require("../services/regimentType.service");

exports.createRegimentType = async (req, res) => {
  try {
    const {
      health_insurance_id,
      regiment_type,
      category,
      max_value_event
    } = req.body;

    const newRegimentType = await regimentTypeService.createRegimentType(
      health_insurance_id,
      regiment_type,
      category,
      max_value_event
    );

    res.status(200).json({
      mensaje: "Tipo de régimen creado correctamente",
      nuevoTipoRegimen: newRegimentType,
      exito: true
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al crear tipo de régimen",
      error: error.message,
      exito: false
    });
  }
};

exports.getRegimentType = async (req, res) => {
  try {
    const idTipoRegimen = req.params.id;
    const tipoRegimen = await regimentTypeService.getRegimentType(idTipoRegimen);

    if (!tipoRegimen) {
      return res.status(404).json({ error: "Tipo de régimen no encontrado" });
    }

    res.json(tipoRegimen);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllRegimentTypes = async (req, res) => {
  try {
    const tiposRegimen = await regimentTypeService.getAllRegimentTypes();
    res.json(tiposRegimen);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateRegimentType = async (req, res) => {
  try {
    const idTipoRegimen = req.params.id;
    const {
      health_insurance_id,
      regiment_type,
      category,
      max_value_event
    } = req.body;

    const tipoRegimenActualizado = await regimentTypeService.updateRegimentType(
      idTipoRegimen,
      health_insurance_id,
      regiment_type,
      category,
      max_value_event
    );

    res.json(tipoRegimenActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteRegimentType = async (req, res) => {
  try {
    const idTipoRegimen = req.params.id;
    await regimentTypeService.deleteRegimentType(idTipoRegimen);

    res.json({ mensaje: "Tipo de régimen eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
