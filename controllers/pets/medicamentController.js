const Medicament = require("../../models/pets/medicament");

// ------------------------------ MEDICAMENT ----------------------------------

async function getAll(req, res, next) {
  try {
    const id = req.body.id;
    const result = await Medicament.read(id);

    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error al traer todos los medicamentos. Error: " + error,
    });
  }
}

async function getOneMedicament(req, res, next) {
  try {
    const id = req.body.id;
    const medicament = await Medicament.readById(id);
    return res.status(201).json(medicament);
  } catch (error) {
    console.log(`Error: ${error}`);
    return res.status(501).json({
      success: false,
      message: "Error al obtener el medicament.",
    });
  }
}

async function addMedicament(req, res, next) {
  try {
    const info = req.body;
    console.log(info);
    await Medicament.add(info);

    return res.status(201).json({
      success: true,
      message: "Se ha guardado la información del medicamento correctamente.",
    });
  } catch (error) {
    console.log(`Error: ${error}`);
    return res.status(501).json({
      success: false,
      message: "Hubo un error con el registro del medicamento.",
      error: error,
    });
  }
}

async function updateMedicament(req, res, next) {
  try {
    const info = req.body;
    console.log(info);
    const saved = await Medicament.readById(info.id);

    if (saved) {
      await Medicament.update(info);

      return res.status(201).json({
        success: true,
        message: "Actualización exitosa.",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "No existe le medicamento",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      success: false,
      message: "Hubo un error con la actualización del medicamento.",
      error: error,
    });
  }
}

async function deleteMedicament(req, res, next) {
  try {
    const id = req.body.id;
    const result = await Medicament.delete(id);

    if (result) {
      return res
        .status(200)
        .json({ message: "Medicamento eliminado con éxito" });
    } else {
      return res.status(404).json({ message: "Medicamento no encontrado" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error al eliminar el medicamento" });
  }
}

module.exports = {
  getAll,
  getOneMedicament,
  addMedicament,
  updateMedicament,
  deleteMedicament,
};
