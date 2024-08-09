// controllers/AntecedentController.js
const antecedentService = require("../../services/relative/antecedent.service");

exports.createAntecedent = async (req, res) => {
  try {
    const data = req.body;
    const newAntecedent = await antecedentService.createAntecedent(data);

    return res.status(200).json({
      message: "Antecedente creado correctamente",
      newAntecedent: newAntecedent,
      success: true
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error al crear el antecedente",
      error: error.message,
      success: false
    });
  }
};

exports.getAntecedent = async (req, res) => {
  try {
    const id = req.params.id;
    const antecedent = await antecedentService.getAntecedent(id);

    if (!antecedent) {
      return res.status(404).json({ error: "Antecedente no encontrado", success: false });
    }

    return res.status(200).json({ antecedent, success: true });
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};

exports.getAllAntecedents = async (req, res) => {
  try {
    const antecedents = await antecedentService.getAllAntecedents();
    return res.status(200).json({ antecedents, success: true });
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};


exports.updateAntecedentByRelative = async (req, res) => {
  try {
    const id_paciente = req.params.id; // ID del paciente
    const antecedentsData = req.body; // Array de antecedentes

    // Recuperar antecedentes actuales para el paciente
    const currentAntecedents = await antecedentService.getAntecedentByRelative(id_paciente);

    // Crear arrays para identificar qué antecedentes agregar, actualizar o eliminar
    const antecedentsToAdd = [];
    const antecedentsToUpdate = [];
    const antecedentsToDelete = [];

    // Mapear antecedentes actuales por id
    const currentAntecedentsMap = new Map(currentAntecedents.map(antecedent => [antecedent.id, antecedent]));

    // Buscar antecedentes para agregar o actualizar
    antecedentsData.forEach(newAntecedent => {
      const existingAntecedent = currentAntecedentsMap.get(newAntecedent.id);

      if (existingAntecedent) {
        // Si el antecedente existe y ha cambiado, marcar para actualizar
        antecedentsToUpdate.push({
          id: existingAntecedent.id,
          id_paciente,
          tipo_antecedente: newAntecedent.tipoAntecedente,
          descripcion_antecedente: newAntecedent.descripcionAntecedente,
          fecha_antecedente: newAntecedent.fechaAntecedente,
          created_at: existingAntecedent.created_at, // Mantener el valor existente si no se actualiza
          updated_at: new Date(),
        });
      } else {
        // Si el antecedente no existe, marcar para agregar
        antecedentsToAdd.push({
          id_paciente,
          tipo_antecedente: newAntecedent.tipoAntecedente,
          descripcion_antecedente: newAntecedent.descripcionAntecedente,
          fecha_antecedente: newAntecedent.fechaAntecedente,
          created_at: new Date(), // Solo es necesario si la base de datos no lo maneja automáticamente
          updated_at: new Date(),
          id: newAntecedent.id // Incluir identificador único
        });
      }
    });

    // Buscar antecedentes para eliminar
    const existingids = new Set(antecedentsData.map(antecedent => antecedent.id));
    currentAntecedents.forEach(existingAntecedent => {
      if (!existingids.has(existingAntecedent.id)) {
        antecedentsToDelete.push(existingAntecedent.id); 
      }
    });

    // Procesar adiciones
    await Promise.all(antecedentsToAdd.map(antecedent => antecedentService.createAntecedent(antecedent)));

    // Procesar actualizaciones
    await Promise.all(antecedentsToUpdate.map(antecedent => antecedentService.updateAntecedent(antecedent.id, antecedent)));

    // Procesar eliminaciones
    await Promise.all(antecedentsToDelete.map(id => antecedentService.deleteAntecedent(id)));

    // Retornar la lista actualizada de antecedentes
    const updatedAntecedents = await antecedentService.getAntecedentByRelative(id_paciente);
    return res.status(200).json({ updatedAntecedents, success: true });

  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};




exports.deleteAntecedent = async (req, res) => {
  try {
    const id = req.params.id;
    await antecedentService.deleteAntecedent(id);

    return res.status(200).json({ message: "Antecedente eliminado correctamente", success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message, success: false });
  }
};
