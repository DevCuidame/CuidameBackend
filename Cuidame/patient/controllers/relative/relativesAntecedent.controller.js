// controllers/RelativeAntecedentController.js
const relativeAntecedentService = require("../../services/relative/relativesAntecedent.service");

exports.createRelativeAntecedent = async (req, res) => {
  try {
    const data = req.body;
    const newRelativeAntecedent = await relativeAntecedentService.createRelativeAntecedent(data);

    return res.status(200).json({
      message: "Antecedente familiar creado correctamente",
      newRelativeAntecedent: newRelativeAntecedent,
      success: true
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error al crear el antecedente familiar",
      error: error.message,
      success: false
    });
  }
};

exports.getRelativeAntecedent = async (req, res) => {
  try {
    const id = req.params.id;
    const relativeAntecedent = await relativeAntecedentService.getRelativeAntecedent(id);

    if (!relativeAntecedent) {
      return res.status(404).json({ error: "Antecedente familiar no encontrado", success: false });
    }

    return res.status(200).json({ relativeAntecedent, success: true });
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};

exports.getAllRelativeAntecedents = async (req, res) => {
  try {
    const relativeAntecedents = await relativeAntecedentService.getAllRelativeAntecedents();
    return res.status(200).json({ relativeAntecedents, success: true });
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};

exports.updateRelativeAntecedent = async (req, res) => {
  try {
    const id_paciente = req.params.id;
    const relativeAntecedentsData = req.body;
    console.log("🚀 ~ exports.updateRelativeAntecedent= ~ relativeAntecedentsData:", relativeAntecedentsData);

    const currentRelativeAntecedents = await relativeAntecedentService.getRelativeAntecedentByRelative(id_paciente) || [];

    const currentAntecedentsMap = new Map(currentRelativeAntecedents.map(antecedent => [antecedent.id, antecedent]));

    const antecedentsToAdd = [];
    const antecedentsToUpdate = [];
    const antecedentsToDelete = [];

    relativeAntecedentsData.forEach(newAntecedent => {
      if (newAntecedent.id) {
        const existingAntecedent = currentAntecedentsMap.get(newAntecedent.id);

        if (existingAntecedent) {
          antecedentsToUpdate.push({
            id: newAntecedent.id,
            id_paciente,
            tipo_antecedente: newAntecedent.tipoAntecedenteF,
            parentesco: newAntecedent.parentescoF,
            descripcion_antecedente: newAntecedent.descripcionAntecedenteF,
            created_at: existingAntecedent.created_at,
            updated_at: new Date(),
          });
        } else {
          console.warn(`Antecedente con ID ${newAntecedent.id} no encontrado para actualización.`);
        }
      } else {
        antecedentsToAdd.push({
          id_paciente,
          tipo_antecedente: newAntecedent.tipoAntecedenteF,
          parentesco: newAntecedent.parentescoF,
          descripcion_antecedente: newAntecedent.descripcionAntecedenteF,
          created_at: new Date(),
          updated_at: new Date(),
        });
      }
    });

    // Identificar antecedentes para eliminar
    const receivedIds = new Set(relativeAntecedentsData.map(antecedent => antecedent.id));
    currentRelativeAntecedents.forEach(existingAntecedent => {
      if (!receivedIds.has(existingAntecedent.id)) {
        antecedentsToDelete.push(existingAntecedent.id);
      }
    });

    // Procesar adiciones
    if (antecedentsToAdd.length > 0) {
      await Promise.all(antecedentsToAdd.map(antecedent => relativeAntecedentService.createRelativeAntecedent(antecedent)));
    }

    // Procesar actualizaciones
    if (antecedentsToUpdate.length > 0) {
      await Promise.all(antecedentsToUpdate.map(antecedent => relativeAntecedentService.updateRelativeAntecedent(antecedent.id, antecedent)));
    }

    // Procesar eliminaciones
    if (antecedentsToDelete.length > 0) {
      await Promise.all(antecedentsToDelete.map(id => relativeAntecedentService.deleteRelativeAntecedent(id)));
    }

    // Retornar la lista actualizada de antecedentes
    const updatedRelativeAntecedents = await relativeAntecedentService.getRelativeAntecedentByRelative(id_paciente);
    return res.status(200).json({ updatedRelativeAntecedents, success: true });

  } catch (error) {
    console.error("Error en updateRelativeAntecedent:", error);
    return res.status(400).json({ error: error.message, success: false });
  }
};



exports.deleteRelativeAntecedent = async (req, res) => {
  try {
    const id = req.params.id;
    await relativeAntecedentService.deleteRelativeAntecedent(id);

    return res.status(200).json({ message: "Antecedente familiar eliminado correctamente", success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message, success: false });
  }
};
