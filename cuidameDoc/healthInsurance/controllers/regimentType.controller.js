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

    return res.status(200).json({
      message: "Tipo de régimen creado correctamente",
      nuevoTipoRegimen: newRegimentType,
      success: true
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error al crear tipo de régimen",
      error: error.message,
      success: false
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

   return res.status(200).json({tipoRegimen, success: true});
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false});
  }
};

exports.getAllRegimentTypes = async (req, res) => {
  try {
    const tiposRegimen = await regimentTypeService.getAllRegimentTypes();
   return res.status(200).json({tiposRegimen, success: true});
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false});
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

   return res.status(200).json({tipoRegimenActualizado, success: true});
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false});
  }
};

exports.deleteRegimentType = async (req, res) => {
  try {
    const idTipoRegimen = req.params.id;
    await regimentTypeService.deleteRegimentType(idTipoRegimen);

   return res.status(200).json({ message: "Tipo de régimen eliminado correctamente" });
  } catch (error) {
    return res.status(500).json({ error: error.message, success: false});
  }
};
