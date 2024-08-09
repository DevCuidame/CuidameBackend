// controllers/VaccineController.js
const vaccineService = require("../../services/relative/vaccine.service");

exports.createVaccine = async (req, res) => {
  try {
    const data = req.body;
    const newVaccine = await vaccineService.createVaccine(data);

    return res.status(200).json({
      message: "Vacuna creada correctamente",
      newVaccine: newVaccine,
      success: true
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error al crear la vacuna",
      error: error.message,
      success: false
    });
  }
};

exports.getVaccine = async (req, res) => {
  try {
    const id = req.params.id;
    const vaccine = await vaccineService.getVaccine(id);

    if (!vaccine) {
      return res.status(404).json({ error: "Vacuna no encontrada", success: false });
    }

    return res.status(200).json({ vaccine, success: true });
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};

exports.getAllVaccines = async (req, res) => {
  try {
    const vaccines = await vaccineService.getAllVaccines();
    return res.status(200).json({ vaccines, success: true });
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};

exports.updateVaccine = async (req, res) => {
  try {
    const id_paciente = req.params.id;  // ID del paciente
    const vaccinesData = req.body;  // Array de vacunas
    console.log("🚀 ~ exports.updateVaccine= ~ vaccinesData:", vaccinesData);

    // Recuperar vacunas actuales para el paciente
    const currentVaccines = await vaccineService.getVaccineByRelative(id_paciente) || []; 

    // Mapear vacunas actuales por ID
    const currentVaccinesMap = new Map(currentVaccines.map(vaccine => [vaccine.id, vaccine]));

    // Crear arrays para identificar qué vacunas agregar, actualizar o eliminar
    const vaccinesToAdd = [];
    const vaccinesToUpdate = [];
    const vaccinesToDelete = [];

    // Procesar los datos recibidos
    vaccinesData.forEach(newVaccine => {
      if (newVaccine.id) {
        // Si la vacuna tiene un ID, actualizar si existe
        const existingVaccine = currentVaccinesMap.get(newVaccine.id);

        if (existingVaccine) {
          // Si la vacuna existe y ha cambiado, marcar para actualizar
          vaccinesToUpdate.push({
            id: newVaccine.id,
            id_paciente,
            vacuna: newVaccine.vacuna,
            created_at: existingVaccine.created_at, // Mantener el valor existente si no se actualiza
            updated_at: new Date(),
          });
        } else {
          // Si la vacuna no existe, ignorar o manejar error
          console.warn(`Vaccine con ID ${newVaccine.id} no encontrado para actualización.`);
        }
      } else {
        // Si la vacuna no tiene ID, agregar
        vaccinesToAdd.push({
          id_paciente,
          vacuna: newVaccine.vacuna,
          created_at: new Date(), // Solo si no es gestionado automáticamente por la base de datos
          updated_at: new Date(),
        });
      }
    });

    // Identificar vacunas para eliminar
    const receivedIds = new Set(vaccinesData.map(vaccine => vaccine.id).filter(id => id != null)); // Filtrar IDs nulos
    currentVaccines.forEach(existingVaccine => {
      if (!receivedIds.has(existingVaccine.id)) {
        vaccinesToDelete.push(existingVaccine.id);
      }
    });

    // Procesar adiciones
    if (vaccinesToAdd.length > 0) {
      await Promise.all(vaccinesToAdd.map(vaccine => vaccineService.createVaccine(vaccine)));
    }

    // Procesar actualizaciones
    if (vaccinesToUpdate.length > 0) {
      await Promise.all(vaccinesToUpdate.map(vaccine => vaccineService.updateVaccine(vaccine.id, vaccine)));
    }

    // Procesar eliminaciones
    if (vaccinesToDelete.length > 0) {
      await Promise.all(vaccinesToDelete.map(id => vaccineService.deleteVaccine(id)));
    }

    // Retornar la lista actualizada de vacunas
    const updatedVaccines = await vaccineService.getVaccineByRelative(id_paciente);
    return res.status(200).json({ updatedVaccines, success: true });

  } catch (error) {
    console.error("Error en updateVaccine:", error);
    return res.status(400).json({ error: error.message, success: false });
  }
};


exports.deleteVaccine = async (req, res) => {
  try {
    const id = req.params.id;
    await vaccineService.deleteVaccine(id);

    return res.status(200).json({ message: "Vacuna eliminada correctamente", success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message, success: false });
  }
};
