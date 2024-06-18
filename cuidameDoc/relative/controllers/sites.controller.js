// controllers/SiteController.js
const siteService = require("../services/sites.service");

exports.createSite = async (req, res) => {
  try {
    const { address, phone, contact, city_id, company_id } = req.body;
    const newSite = await siteService.createSite(address, phone, contact, city_id, company_id);
    return res.status(200).json({
      message: "Sitio creado correctamente",
      newSite: newSite,
      success: true
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error al crear sitio",
      error: error.message,
      success: false
    });
  }
};

exports.getSite = async (req, res) => {
  try {
    const idSite = req.params.id;
    const site = await siteService.getSite(idSite);
    if (!site) {
      return res.status(404).json({ error: "Sitio no encontrado", success: false });
    }
    return res.status(200).json({site, success: true});
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};

exports.updateSite = async (req, res) => {
  try {
    const idSite = req.params.id;
    const { address, phone, contact, city_id, company_id } = req.body;
    const updatedSite = await siteService.updateSite(idSite, address, phone, contact, city_id, company_id);
    return res.status(200).json({
      message: "Sitio actualizado correctamente",
      updatedSite, success: true
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error al actualizar sitio",
      error: error.message, success: false
    });
  }
};

exports.deleteSite = async (req, res) => {
  try {
    const idSite = req.params.id;
    await siteService.deleteSite(idSite);
    return res.status(200).json({ message: "Sitio eliminado correctamente", success: true });
  } catch (error) {
    return res.status(500).json({
      message: "Error al eliminar sitio",
      error: error.message, success: false
    });
  }
};

exports.getAllSites = async (req, res) => {
  try {
    const sites = await siteService.getAllSites();
    return res.status(200).json({sites, success: true});
  } catch (error) {
    return res.status(400).json({
      message: "Error al obtener todos los sitios",
      error: error.message, success: false
    });
  }
};
