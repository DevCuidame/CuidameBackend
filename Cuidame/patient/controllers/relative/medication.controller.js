// controllers/MedicationController.js
const medicationService = require("../../services/relative/medication.service");

exports.createMedication = async (req, res) => {
  try {
    const data = req.body;
    const newMedication = await medicationService.createMedication(
      data.name,
      data.description,
      data.quantity,
      data.dosage,
      data.frequency,
      data.manufacturer,
      data.expiration_date,
      data.prescription_required,
      data.category,
      data.administration_method,
      data.side_effects,
      data.storage_instructions,
      data.relative_id
    );

    return res.status(200).json({
      message: "Medicamento creado correctamente",
      newMedication,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error al crear el medicamento",
      error: error.message,
      success: false,
    });
  }
};

exports.getMedication = async (req, res) => {
  try {
    const id = req.params.id;
    const medication = await medicationService.getMedication(id);

    if (!medication) {
      return res
        .status(404)
        .json({ error: "Medicamento no encontrado", success: false });
    }

    return res.status(200).json({ medication, success: true });
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};

exports.getAllMedications = async (req, res) => {
  try {
    const medications = await medicationService.getAllMedications();
    return res.status(200).json({ medications, success: true });
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};

exports.updateMedication = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const updatedMedication = await medicationService.updateMedication(
      id,
      data.name,
      data.description,
      data.quantity,
      data.dosage,
      data.frequency,
      data.manufacturer,
      data.expiration_date,
      data.prescription_required,
      data.category,
      data.administration_method,
      data.side_effects,
      data.storage_instructions,
      data.relative_id
    );

    return res.status(200).json({
      message: "Medicamento actualizado correctamente",
      updatedMedication,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error al actualizar el medicamento",
      error: error.message,
      success: false,
    });
  }
};

exports.deleteMedication = async (req, res) => {
  try {
    const id = req.params.id;
    await medicationService.deleteMedication(id);

    return res
      .status(200)
      .json({ message: "Medicamento eliminado correctamente", success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message, success: false });
  }
};
