// controllers/ProviderController.js
const service = require("../../services/provider.service");

exports.createProvider = async (req, res) => {
  try {

    const exists = await service.getProviderByEmail(req.body.email)
    const sameCardId = await service.getProviderByCardId(req.body.identification_number)

    if (sameCardId) {
      return res.status(400).json({message: "Número de identificación no válido."});
    }

    if (exists) {
      return res.status(400).json({message: "Correo no válido."});
    }
    const newProvider = await service.createProvider(req.body);
    return res.status(200).json({message: "!Te has registrado correctamente!", newProvider, success: true});
  } catch (error) {
    res.status(400).json({message: "Ha ocurrido un error al registrarte.", error: error.message, success: false });
  }
};

exports.getProvider = async (req, res) => {
  try {
    const provider = await service.getProvider(req.params.id);

    if (!provider) {
      res.status(404).json({ error: "Provider not found" });
    }

    res.json(provider);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateProvider = async (req, res) => {
  try {
    const updatedProvider = await service.updateProvider(
      req.params.id,
      req.body
    );
    res.json(updatedProvider);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteProvider = async (req, res) => {
  try {
    await service.deleteProvider(req.params.id);

    const provider = await service.getProvider(req.params.id);
    if (!provider) {
      res.status(404).json({ error: "Provider not found" });
    }

    res.json({ message: "Provider deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
