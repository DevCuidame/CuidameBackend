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

    return res.status(200).json({
      message: "Especialidad adicional creada correctamente",
      newSpeciality: newSpecialty,
      success: true
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error al crear especialidad adicional",
      error: error.message,
      success: false
    });
  }
};

exports.getOtherSpecialty = async (req, res) => {
  try {
    const idSpeciality = req.params.id;
    const speciality = await otherSpecialtiesService.getOtherSpecialty(idSpeciality);

    if (!speciality) {
      return res.status(404).json({ error: "Especialidad adicional no encontrada" , success: false});
    }

    return res.status(200).json({speciality, success: true});
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false});
  }
};

exports.getAllOtherSpecialties = async (req, res) => {
  try {
    const specialities = await otherSpecialtiesService.getAllOtherSpecialties();
    return res.status(200).json({specialities, success: true});
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false});
  }
};

exports.updateOtherSpecialty = async (req, res) => {
  try {
    const idSpeciality = req.params.id;
    const {
      medical_consult_id,
      type,
      date,
      concept,
      result,
      pathology_report
    } = req.body;

    const updatedSpeciality = await otherSpecialtiesService.updateOtherSpecialty(
      idSpeciality,
      medical_consult_id,
      type,
      date,
      concept,
      result,
      pathology_report
    );

    return res.status(200).json({updatedSpeciality, success: true});
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false});
  }
};

exports.deleteOtherSpecialty = async (req, res) => {
  try {
    const idSpeciality = req.params.id;
    await otherSpecialtiesService.deleteOtherSpecialty(idSpeciality);

    return res.status(200).json({ message: "Especialidad adicional eliminada correctamente", success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message, success: false});
  }
};
