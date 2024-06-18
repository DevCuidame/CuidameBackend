// controllers/SiteController.js
const siteService = require("../services/sites.service");

exports.createSite = async (req, res) => {
  try {
    const { address, phone, contact, city_id, company_id } = req.body;
    const newSite = await siteService.createSite(address, phone, contact, city_id, company_id);
    res.status(200).json({
      mensaje: "Sitio creado correctamente",
      nuevoSitio: newSite,
      exito: true
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al crear sitio",
      error: error.message,
      exito: false
    });
  }
};

exports.getSite = async (req, res) => {
  try {
    const idSitio = req.params.id;
    const sitio = await siteService.getSite(idSitio);
    if (!sitio) {
      return res.status(404).json({ error: "Sitio no encontrado" });
    }
    res.json(sitio);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateSite = async (req, res) => {
  try {
    const idSitio = req.params.id;
    const { address, phone, contact, city_id, company_id } = req.body;
    const sitioActualizado = await siteService.updateSite(idSitio, address, phone, contact, city_id, company_id);
    res.json({
      mensaje: "Sitio actualizado correctamente",
      sitioActualizado
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al actualizar sitio",
      error: error.message
    });
  }
};

exports.deleteSite = async (req, res) => {
  try {
    const idSitio = req.params.id;
    await siteService.deleteSite(idSitio);
    res.json({ mensaje: "Sitio eliminado correctamente" });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar sitio",
      error: error.message
    });
  }
};

exports.getAllSites = async (req, res) => {
  try {
    const sitios = await siteService.getAllSites();
    res.json(sitios);
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al obtener todos los sitios",
      error: error.message
    });
  }
};
