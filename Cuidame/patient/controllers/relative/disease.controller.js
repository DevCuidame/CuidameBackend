// controllers/DiseaseController.js
const User = require("../../../../models/user");
const diseaseService = require("../../services/relative/disease.service");

exports.createDisease = async (req, res) => {
  try {
    const data = req.body;
    const newDisease = await diseaseService.createDisease(data);

    return res.status(200).json({
      message: "Enfermedad creada correctamente",
      newDisease: newDisease,
      success: true
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error al crear la enfermedad",
      error: error.message,
      success: false
    });
  }
};

exports.getDisease = async (req, res) => {
  try {
    const id = req.params.id;
    const disease = await diseaseService.getDisease(id);

    if (!disease) {
      return res.status(404).json({ error: "Enfermedad no encontrada", success: false });
    }

    return res.status(200).json({ disease, success: true });
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};

exports.getAllDiseases = async (req, res) => {
  try {
    const diseases = await diseaseService.getAllDiseases();
    return res.status(200).json({ diseases, success: true });
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};

exports.updateDisease = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedDisease = await diseaseService.updateDisease(id, data);

    return res.status(200).json({ updatedDisease, success: true });
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};


exports.updateDiseaseByRelative = async (req, res) => {
  try {
    const id_paciente = req.params.id; 
    const diseasesData = req.body; 
    console.log("🚀 ~ exports.updateDiseaseByRelative= ~ diseasesData:", diseasesData)

    const currentDiseases = await diseaseService.getDiseaseByRelative(id_paciente);

    const createdDiseases = [];
    
    if (!currentDiseases || currentDiseases.length === 0) {
      await Promise.all(
        diseasesData.map(async (diseaseData) => {
          const newDisease = await diseaseService.createDisease({
            id_paciente,
            ...diseaseData
          });
          createdDiseases.push(newDisease);
        })
      );
      
      return res.status(200).json({
        message: "Enfermedades creadas correctamente",
        createdDiseases: createdDiseases,
        success: true,
      });
    }

    const diseasesToAdd = [];
    const diseasesToDelete = [];

    diseasesData.forEach(newDisease => {
      const existingDisease = currentDiseases.find(disease => disease.enfermedad === newDisease.enfermedad);
      if (!existingDisease) {
        diseasesToAdd.push({ id_paciente, ...newDisease });
      }
    });

    currentDiseases.forEach(existingDisease => {
      const shouldBeDeleted = !diseasesData.some(newDisease => newDisease.enfermedad === existingDisease.enfermedad);
      if (shouldBeDeleted) {
        diseasesToDelete.push(existingDisease.id); // Only push the disease ID for deletion
      }
    });

    // Process additions
    await Promise.all(diseasesToAdd.map(disease => diseaseService.createDisease(disease)));

    // Process deletions
    await Promise.all(diseasesToDelete.map(id => diseaseService.deleteDisease(id)));

    // Return updated list of diseases
    const updatedDiseases = await diseaseService.getDiseaseByRelative(id_paciente);
    return res.status(200).json({ updatedDiseases, success: true });

  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};




exports.deleteDisease = async (req, res) => {
  try {
    const id = req.params.id;
    await diseaseService.deleteDisease(id);

    return res.status(200).json({ message: "Enfermedad eliminada correctamente", success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message, success: false });
  }
};
