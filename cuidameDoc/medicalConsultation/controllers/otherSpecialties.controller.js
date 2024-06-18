// controllers/OtherSpecialtiesController.js
const otherSpecialtiesService = require("../services/otherSpecialties.service");

exports.createOtherSpecialty = async (req, res) => {
  try {
    const {
      medical_consult_id,
      type,
      date,
      concept,
      result,
      pathology_report
    } = req.body;

    const newSpecialty = await otherSpecialtiesService.createOtherSpecialty(
      medical_consult_id,
      type,
      date,
      concept,
      result,
      pathology_report
    );

    res.status(200).json({
      mensaje: "Especialidad adicional creada correctamente",
      nuevaEspecialidad: newSpecialty,
      exito: true
    });
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al crear especialidad adicional",
      error: error.message,
      exito: false
    });
  }
};

exports.getOtherSpecialty = async (req, res) => {
  try {
    const idEspecialidad = req.params.id;
    const especialidad = await otherSpecialtiesService.getOtherSpecialty(idEspecialidad);

    if (!especialidad) {
      return res.status(404).json({ error: "Especialidad adicional no encontrada" });
    }

    res.json(especialidad);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllOtherSpecialties = async (req, res) => {
  try {
    const especialidades = await otherSpecialtiesService.getAllOtherSpecialties();
    res.json(especialidades);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateOtherSpecialty = async (req, res) => {
  try {
    const idEspecialidad = req.params.id;
    const {
      medical_consult_id,
      type,
      date,
      concept,
      result,
      pathology_report
    } = req.body;

    const especialidadActualizada = await otherSpecialtiesService.updateOtherSpecialty(
      idEspecialidad,
      medical_consult_id,
      type,
      date,
      concept,
      result,
      pathology_report
    );

    res.json(especialidadActualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteOtherSpecialty = async (req, res) => {
  try {
    const idEspecialidad = req.params.id;
    await otherSpecialtiesService.deleteOtherSpecialty(idEspecialidad);

    res.json({ mensaje: "Especialidad adicional eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
