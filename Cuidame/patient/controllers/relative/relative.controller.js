// controllers/RelativeController.js
const relativeService = require("../../services/relative/relative.service");
const allergyService = require("../../services/relative/allergy.service");
const antecedentService = require("../../services/relative/antecedent.service");
const conditionService = require("../../services/relative/condition.service");
const diseaseService = require("../../services/relative/disease.service");
const medicamentService = require("../../services/relative/medicament.service");
const relativeAntecedentService = require("../../services/relative/relativesAntecedent.service");
const vaccineService = require("../../services/relative/vaccine.service");

exports.createRelative = async (req, res) => {
  const { nanoid } = await import("nanoid");

  try {
    const data = req.body;
    const newRelative = await relativeService.createRelative(data);

    return res.status(200).json({
      message: "Familiar creado correctamente",
      newRelative: newRelative,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error al crear el Familiar",
      error: error.message,
      success: false,
    });
  }
};

exports.getRelative = async (req, res) => {
  try {
    const id = req.params.id;
    const relative = await relativeService.getRelative(id);

    if (!relative) {
      return res
        .status(404)
        .json({ error: "Familiar no encontrado", success: false });
    }

    return res.status(200).json({ relative, success: true });
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};

exports.getAllRelatives = async (req, res) => {
  try {
    const relatives = await relativeService.getAllRelatives();
    return res.status(200).json({ relatives, success: true });
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};

exports.updateRelative = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedRelative = await relativeService.updateRelative(id, data);

    return res.status(200).json({ updatedRelative, success: true });
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};

exports.deleteRelative = async (req, res) => {
  try {
    const id = req.params.id;
    await relativeService.deleteRelative(id);

    return res
      .status(200)
      .json({ message: "Familiar eliminado correctamente", success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message, success: false });
  }
};

exports.getRelativeWithAllInfo = async (req, res) => {
  try {
    const id = req.params.id;
    const relative = await relativeService.getRelative(id);

    if (!relative) {
      return res
        .status(404)
        .json({ error: "Familiar no encontrado", success: false });
    }

    // Fetch related data
    const antecedents = await antecedentService.getAntecedentByRelative();
    const conditions = await conditionService.getConditionByRelative();
    const diseases = await diseaseService.getDiseaseByRelative();
    const medicaments = await medicamentService.getMedicamentByRelative();
    const vaccines = await vaccineService.getVaccineByRelative();
    const allergies = await allergyService.getAllergyByPaciente();
    const relativeAntecedent = await relativeAntecedentService.getRelativeAntecedentByRelative();

    // Assuming that each related data has a field "id_paciente" to link it to the relative
    // relative.antecedents = antecedents.filter((a) => a.id_paciente === id);
    // relative.conditions = conditions.filter((c) => c.id_paciente === id);
    // relative.diseases = diseases.filter((d) => d.id_paciente === id);
    // relative.medicaments = medicaments.filter((m) => m.id_paciente === id);
    // relative.vaccines = vaccines.filter((v) => v.id_paciente === id);
    // relative.allergies = allergies.filter((v) => v.id_paciente === id);
    // relative.relativeAntecedent = relativeAntecedent.filter((v) => v.id_paciente === id);

    relative.allergies = allergies;
    relative.antecedents = antecedents;
    relative.conditions = conditions;
    relative.diseases = diseases;
    relative.medicaments = medicaments;
    relative.relativeAntecedent = relativeAntecedent;
    relative.vaccines = vaccines;

    return res.status(200).json({ relative, success: true });
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};
