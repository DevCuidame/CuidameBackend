// controllers/HealthInsuranceController.js
const healthInsuranceService = require("../services/healthInsurance.service");

exports.createHealthInsurance = async (req, res) => {
  try {
    const { company, address1, address2, city, phone, email } = req.body;
    const newHealthInsurance = await healthInsuranceService.createHealthInsurance(company, address1, address2, city, phone, email);
    res.status(200).json({
      mensaje: "Seguro de salud creado correctamente",
      nuevoSeguro: newHealthInsurance,
      exito: true
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al crear seguro de salud",
      error: error.message,
      exito: false
    });
  }
};

exports.getHealthInsurance = async (req, res) => {
  try {
    const idSeguro = req.params.id;
    const seguro = await healthInsuranceService.getHealthInsurance(idSeguro);
    if (!seguro) {
      return res.status(404).json({ error: "Seguro de salud no encontrado" });
    }
    res.json(seguro);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateHealthInsurance = async (req, res) => {
  try {
    const idSeguro = req.params.id;
    const { company, address1, address2, city, phone, email } = req.body;
    const seguroActualizado = await healthInsuranceService.updateHealthInsurance(idSeguro, company, address1, address2, city, phone, email);
    res.json({
      mensaje: "Seguro de salud actualizado correctamente",
      seguroActualizado
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al actualizar seguro de salud",
      error: error.message
    });
  }
};

exports.deleteHealthInsurance = async (req, res) => {
  try {
    const idSeguro = req.params.id;
    await healthInsuranceService.deleteHealthInsurance(idSeguro);
    res.json({ mensaje: "Seguro de salud eliminado correctamente" });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar seguro de salud",
      error: error.message
    });
  }
};

exports.getAllHealthInsurances = async (req, res) => {
  try {
    const seguros = await healthInsuranceService.getAllHealthInsurances();
    res.json(seguros);
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al obtener todos los seguros de salud",
      error: error.message
    });
  }
};
