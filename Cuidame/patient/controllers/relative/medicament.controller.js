// controllers/MedicamentController.js
const medicamentService = require("../../services/relative/medicament.service");

exports.createMedicament = async (req, res) => {
  try {
    const data = req.body;
    const newMedicament = await medicamentService.createMedicament(data);

    return res.status(200).json({
      message: "Medicamento creado correctamente",
      newMedicament: newMedicament,
      success: true
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error al crear el medicamento",
      error: error.message,
      success: false
    });
  }
};

exports.getMedicament = async (req, res) => {
  try {
    const id = req.params.id;
    const medicament = await medicamentService.getMedicament(id);

    if (!medicament) {
      return res.status(404).json({ error: "Medicamento no encontrado", success: false });
    }

    return res.status(200).json({ medicament, success: true });
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};

exports.getAllMedicaments = async (req, res) => {
  try {
    const medicaments = await medicamentService.getAllMedicaments();
    return res.status(200).json({ medicaments, success: true });
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};

exports.updateMedicament = async (req, res) => {
  try {
    const id_paciente = req.params.id; // ID del paciente
    const medicamentsData = req.body; // Array de medicamentos

    // Recuperar medicamentos actuales para el paciente
    const currentMedicaments = await medicamentService.getMedicamentByRelative(id_paciente) || []; // Manejar caso en que no hay medicamentos

    // Mapear medicamentos actuales por ID
    const currentMedicamentsMap = new Map(currentMedicaments.map(medicament => [medicament.id, medicament]));

    // Crear arrays para identificar qué medicamentos agregar, actualizar o eliminar
    const medicamentsToAdd = [];
    const medicamentsToUpdate = [];
    const medicamentsToDelete = [];

    // Procesar los datos recibidos
    medicamentsData.forEach(newMedicament => {
      if (newMedicament.id) {
        // Si el medicamento tiene un ID, actualizar si existe
        const existingMedicament = currentMedicamentsMap.get(newMedicament.id);

        if (existingMedicament) {
          // Si el medicamento existe y ha cambiado, marcar para actualizar
          medicamentsToUpdate.push({
            id: newMedicament.id,
            id_paciente,
            medicamento: newMedicament.medicamento,
            laboratorio: newMedicament.laboratorio,
            formula: newMedicament.formula,
            created_at: existingMedicament.created_at, // Mantener el valor existente si no se actualiza
            updated_at: new Date(),
          });
        } else {
          // Si el medicamento no existe, ignorar o manejar error
          console.warn(`Medicament con ID ${newMedicament.id} no encontrado para actualización.`);
        }
      } else {
        // Si el medicamento no tiene ID, agregar
        medicamentsToAdd.push({
          id_paciente,
          medicamento: newMedicament.medicamento,
          laboratorio: newMedicament.laboratorio,
          formula: newMedicament.formula,
          created_at: new Date(), // Solo si no es gestionado automáticamente por la base de datos
          updated_at: new Date(),
        });
      }
    });

    // Identificar medicamentos para eliminar
    const receivedIds = new Set(medicamentsData.map(medicament => medicament.id).filter(id => id != null));
    currentMedicaments.forEach(existingMedicament => {
      if (!receivedIds.has(existingMedicament.id)) {
        medicamentsToDelete.push(existingMedicament.id);
      }
    });

    // Procesar adiciones
    if (medicamentsToAdd.length > 0) {
      await Promise.all(medicamentsToAdd.map(medicament => medicamentService.createMedicament(medicament)));
    }

    // Procesar actualizaciones
    if (medicamentsToUpdate.length > 0) {
      await Promise.all(medicamentsToUpdate.map(medicament => medicamentService.updateMedicament(medicament.id, medicament)));
    }

    // Procesar eliminaciones
    if (medicamentsToDelete.length > 0) {
      await Promise.all(medicamentsToDelete.map(id => medicamentService.deleteMedicament(id)));
    }

    // Retornar la lista actualizada de medicamentos
    const updatedMedicaments = await medicamentService.getMedicamentByRelative(id_paciente);
    return res.status(200).json({ updatedMedicaments, success: true });

  } catch (error) {
    console.error("Error en updateMedicament:", error);
    return res.status(400).json({ error: error.message, success: false });
  }
};


exports.deleteMedicament = async (req, res) => {
  try {
    const id = req.params.id;
    await medicamentService.deleteMedicament(id);

    return res.status(200).json({ message: "Medicamento eliminado correctamente", success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message, success: false });
  }
};
