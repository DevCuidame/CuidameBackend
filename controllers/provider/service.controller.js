const service = require("../../services/provider.service");

exports.createService = async (req, res) => {
  try {
    const newService = await service.createService(req.body);
    res.json(newService);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getService = async (req, res) => {
  try {
    const service = await service.getService(req.params.id);

    if (!service) {
      res.status(404).json({ error: 'Service not found' });
      return;
    }

    res.json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateService = async (req, res) => {
  try {
    const updatedService = await service.updateService(
      req.params.id,
      req.body
    );
    res.json(updatedService);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    await service.deleteService(req.params.id);

    const service = await service.getService(req.params.id);
    if (!service) {
      res.status(404).json({ error: 'Service not found' });
      return;
    }

    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
