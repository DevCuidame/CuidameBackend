// controllers/ProviderController.js
const service = require("../../services/provider.service");

exports.createProvider = async (req, res) => {
  try {
    const newProvider = await service.createProvider(req.body);
    res.json(newProvider);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getProvider = async (req, res) => {
  try {
    const provider = await service.getProvider(req.params.id);

    if (!provider) {
      res.status(404).json({ error: 'Provider not found' });
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
      res.status(404).json({ error: 'Provider not found' });
    }

    res.json({ message: "Provider deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
