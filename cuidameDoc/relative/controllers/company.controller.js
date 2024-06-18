// controllers/CompanyController.js
const companyService = require("../services/company.service");

exports.createCompany = async (req, res) => {
  try {
    const { name, address, nit, phone, contact, city_id } = req.body;
    const newCompany = await companyService.createCompany({ name, address, nit, phone, contact, city_id });
    res.status(200).json({
      mensaje: "Empresa creada correctamente",
      nuevaEmpresa: newCompany,
      exito: true
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al crear empresa",
      error: error.message,
      exito: false
    });
  }
};

exports.getCompany = async (req, res) => {
  try {
    const idEmpresa = req.params.id;
    const empresa = await companyService.getCompany(idEmpresa);
    if (!empresa) {
      return res.status(404).json({ error: "Empresa no encontrada" });
    }
    res.json(empresa);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateCompany = async (req, res) => {
  try {
    const idEmpresa = req.params.id;
    const { name, address, nit, phone, contact, city_id } = req.body;
    const empresaActualizada = await companyService.updateCompany(idEmpresa, { name, address, nit, phone, contact, city_id });
    res.json({
      mensaje: "Empresa actualizada correctamente",
      empresaActualizada
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al actualizar empresa",
      error: error.message
    });
  }
};

exports.deleteCompany = async (req, res) => {
  try {
    const idEmpresa = req.params.id;
    await companyService.deleteCompany(idEmpresa);
    res.json({ mensaje: "Empresa eliminada correctamente" });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar empresa",
      error: error.message
    });
  }
};

exports.getAllCompanies = async (req, res) => {
  try {
    const empresas = await companyService.getAllCompanies();
    res.json(empresas);
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al obtener todas las empresas",
      error: error.message
    });
  }
};
