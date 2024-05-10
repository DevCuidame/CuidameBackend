const service = require("../../services/veterinary_clinics.service");

exports.getAllVeterinary = async (req, res) => {
  try {
    const data = await service.getAll();

    if (!data) {
      res.status(404).json({ error: "No hay veterinarias" });
    }

    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getByService = async (req, res) => {
  try {
    const data = await service.getByService(req.params.service);

    if (!data) {
      res.status(404).json({ error: "No hay veterinarias" });
    }

    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
