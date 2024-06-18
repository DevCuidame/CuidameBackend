// controllers/HealthInsuranceController.js
const validator = require("../../../config/validator");
const healthInsuranceService = require("../services/healthInsurance.service");

exports.createHealthInsurance = async (req, res) => {
  try {
    const { company, address1, address2, city, phone, email } = req.body;

    if (!validator.validateEmail(email)){
      return res.status(400).json({
        message: "El email no es válido",
        success: false
      });
    }

    const exists = await healthInsuranceService.getHealthInsuranceByEmail(email)

    if (exists) {
      return res.status(400).json({
        message: "Ya existe un seguro con el email proporcionado",
        success: false
      });
    }

    const newHealthInsurance = await healthInsuranceService.createHealthInsurance(company, address1, address2, city, phone, email);
    return res.status(200).json({
      message: "Seguro de salud creado correctamente",
      newInsurance: newHealthInsurance,
      success: true
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error al crear seguro de salud",
      error: error.message,
      success: false
    });
  }
};

exports.getHealthInsurance = async (req, res) => {
  try {
    const idInsurance = req.params.id;
    const insurance = await healthInsuranceService.getHealthInsurance(idInsurance);
    if (!insurance) {
      return res.status(404).json({ error: "Seguro de salud no encontrado" });
    }
    return res.json({insurance, success: true});
  } catch (error) {
    return res.status(400).json({ error: error.message , success: false});
  }
};

exports.updateHealthInsurance = async (req, res) => {
  try {
    const idInsurance = req.params.id;
    const { company, address1, address2, city, phone, email } = req.body;


    if (!validator.validateEmail(email)){
      return res.status(400).json({
        message: "El email no es válido",
        success: false
      });
    }

    const exists = await healthInsuranceService.getHealthInsuranceByEmail(email)

    if (exists) {
      return res.status(400).json({
        message: "Ya existe un seguro con el email proporcionado",
        success: false
      });
    }

    const updatedInsurance = await healthInsuranceService.updateHealthInsurance(idInsurance, company, address1, address2, city, phone, email);
    return res.json({
      message: "Seguro de salud actualizado correctamente",
      updatedInsurance, success: true
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al actualizar seguro de salud",
      error: error.message, success: false
    });
  }
};

exports.deleteHealthInsurance = async (req, res) => {
  try {
    const idInsurance = req.params.id;
    await healthInsuranceService.deleteHealthInsurance(idInsurance);
    res.json({ message: "Seguro de salud eliminado correctamente" });
  } catch (error) {
    return res.status(500).json({
      message: "Error al eliminar seguro de salud",
      error: error.message, success: false
    });
  }
};

exports.getAllHealthInsurances = async (req, res) => {
  try {
    const insurances = await healthInsuranceService.getAllHealthInsurances();
    return res.json({insurances, success: true});
  } catch (error) {
    return res.status(400).json({
      message: "Error al obtener todos los seguros de salud",
      error: error.message, success: false
    });
  }
};
