// controllers/CompanyController.js
const companyService = require("../services/company.service");

exports.createCompany = async (req, res) => {
  try {
    const { name, address, nit, phone, contact, city_id } = req.body;

    const exists = await companyService.getCompanyByNit(nit);
    
    if (exists) {
      return res.status(400).json({
        message: "El nit ya existe",
        success: false
      });
    }

    const newCompany = await companyService.createCompany({ name, address, nit, phone, contact, city_id });
    return res.status(200).json({
      message: "Empresa creada correctamente",
      newCompany: newCompany,
      success: true
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error al crear empresa",
      error: error.message,
      success: false
    });
  }
};

exports.getCompany = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await companyService.getCompany(companyId);
    if (!company) {
      return res.status(404).json({ error: "Empresa no encontrada", success: false });
    }
    return res.status(200).json({company, success: true});
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false});
  }
};

exports.updateCompany = async (req, res) => {
  try {
    const companyId = req.params.id;
    const { name, address, nit, phone, contact, city_id } = req.body;
    const updatedCompany = await companyService.updateCompany(companyId, { name, address, nit, phone, contact, city_id });
    return res.status(200).json({
      message: "Empresa actualizada correctamente",
      updatedCompany: updatedCompany, success: true
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error al actualizar empresa",
      error: error.message, success: false
    });
  }
};

exports.deleteCompany = async (req, res) => {
  try {
    const companyId = req.params.id;
    await companyService.deleteCompany(companyId);
    return res.status(200).json({ message: "Empresa eliminada correctamente", success: false });
  } catch (error) {
    return res.status(500).json({
      message: "Error al eliminar empresa",
      error: error.message, success: false
    });
  }
};

exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await companyService.getAllCompanies();
    return res.status(200).json({companies, success: true});
  } catch (error) {
    return res.status(400).json({
      message: "Error al obtener todas las empresas",
      error: error.message, success: false
    });
  }
};
