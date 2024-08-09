// controllers/AllergyController.js
const allergyService = require("../../services/relative/allergy.service");

exports.createAllergy = async (req, res) => {
  try {
    const data = req.body;
    const newAllergy = await allergyService.createAllergy(data);

    return res.status(200).json({
      message: "Alergia creada correctamente",
      newAllergy: newAllergy,
      success: true
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error al crear la alergia",
      error: error.message,
      success: false
    });
  }
};

exports.getAllergy = async (req, res) => {
  try {
    const id = req.params.id;
    const allergy = await allergyService.getAllergy(id);

    if (!allergy) {
      return res.status(404).json({ error: "Alergia no encontrada", success: false });
    }

    return res.status(200).json({ allergy, success: true });
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};

exports.getAllAllergies = async (req, res) => {
  try {
    const allergies = await allergyService.getAllAllergies();
    return res.status(200).json({ allergies, success: true });
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};

exports.updateAllergy = async (req, res) => {
  try {
    const id_paciente = req.params.id;  // ID del paciente
    const allergiesData = req.body;  // Array de alergias

    // Recuperar alergias actuales para el paciente
    const currentAllergies = await allergyService.getAllergyByPaciente(id_paciente) || []; // Manejar caso en que no hay alergias

    // Mapear alergias actuales por ID
    const currentAllergiesMap = new Map(currentAllergies.map(allergy => [allergy.id, allergy]));

    // Crear arrays para identificar qué alergias agregar, actualizar o eliminar
    const allergiesToAdd = [];
    const allergiesToUpdate = [];
    const allergiesToDelete = [];

    // Procesar los datos recibidos
    allergiesData.forEach(newAllergy => {
      if (newAllergy.id) {
        // Si la alergia tiene un ID, actualizar si existe
        const existingAllergy = currentAllergiesMap.get(newAllergy.id);

        if (existingAllergy) {
          // Si la alergia existe y ha cambiado, marcar para actualizar
          allergiesToUpdate.push({
            id: newAllergy.id,
            id_paciente,
            tipo_alergia: newAllergy.tipoAlergia,
            descripcion: newAllergy.descripcion,
            created_at: existingAllergy.created_at, // Mantener el valor existente si no se actualiza
            updated_at: new Date(),
          });
        } else {
          // Si la alergia no existe, ignorar o manejar error
          console.warn(`Allergy con ID ${newAllergy.id} no encontrado para actualización.`);
        }
      } else {
        // Si la alergia no tiene ID, agregar
        allergiesToAdd.push({
          id_paciente,
          tipo_alergia: newAllergy.tipoAlergia,
          descripcion: newAllergy.descripcion,
          created_at: new Date(), // Solo si no es gestionado automáticamente por la base de datos
          updated_at: new Date(),
        });
      }
    });

    // Identificar alergias para eliminar
    const receivedIds = new Set(allergiesData.map(allergy => allergy.id).filter(id => id != null));
    currentAllergies.forEach(existingAllergy => {
      if (!receivedIds.has(existingAllergy.id)) {
        allergiesToDelete.push(existingAllergy.id);
      }
    });

    // Procesar adiciones
    if (allergiesToAdd.length > 0) {
      await Promise.all(allergiesToAdd.map(allergy => allergyService.createAllergy(allergy)));
    }

    // Procesar actualizaciones
    if (allergiesToUpdate.length > 0) {
      await Promise.all(allergiesToUpdate.map(allergy => allergyService.updateAllergy(allergy.id, allergy)));
    }

    // Procesar eliminaciones
    if (allergiesToDelete.length > 0) {
      await Promise.all(allergiesToDelete.map(id => allergyService.deleteAllergy(id)));
    }

    // Retornar la lista actualizada de alergias
    const updatedAllergies = await allergyService.getAllergyByPaciente(id_paciente);
    return res.status(200).json({ updatedAllergies, success: true });

  } catch (error) {
    console.error("Error en updateAllergy:", error);
    return res.status(400).json({ error: error.message, success: false });
  }
};



exports.deleteAllergy = async (req, res) => {
  try {
    const id = req.params.id;
    await allergyService.deleteAllergy(id);

    return res.status(200).json({ message: "Alergia eliminada correctamente", success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message, success: false });
  }
};
