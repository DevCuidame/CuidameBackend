const Service = require("../../services/service.service");

exports.createService = async (req, res) => {
  try {
    const newService = await Service.createService(req.body);
    res.json(newService);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getService = async (req, res) => {
  try {
    const service = await Service.getService(req.params.id);

    if (!service) {
      res.status(404).json({ error: 'Service not found' });
      return;
    }

    res.json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllServices = async (req, res) => {
  try {
    const service = await Service.getAllServices();

    if (!service) {
      res.status(404).json({ error: 'Services not found' });
      return;
    }

    res.status(200).json(service);
  } catch (error) {
    console.log("🚀 ~ exports.getAllServices= ~ error:", error)
    res.status(400).json({ error: error.message });
  }
};

exports.updateService = async (req, res) => {
  try {
    const updatedService = await Service.updateService(
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

    const service = await Service.getService(req.params.id);
    if (!service) {
      res.status(404).json({ error: 'Service not found' });
      return;
    }

    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
