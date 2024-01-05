const DiseaseCondition = require("../../models/pets/diseaseCondition");

// ------------------------------ DiseaseCondition ----------------------------------

async function getAll(req, res, next) {
  try {
    const id = req.body.id;
    console.log('IDENTIFICADOR DE LA MASCOTA: ',id);
    const result = await DiseaseCondition.read(id);

    return res.status(201).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message:
        "Error al traer todos las condiciones de la mascota. Error: " + error,
    });
  }
}

async function getOneDiseaseCondition(req, res, next) {
  try {
    const id = req.body.id;
    console.log(id)
    const diseaseCondition = await DiseaseCondition.readById(id);
    return res.status(201).json(diseaseCondition);
  } catch (error) {
    console.log(`Error: ${error}`);
    return res.status(501).json({
      success: false,
      message: "Error al obtener la condición.",
    });
  }
}

async function addDiseaseCondition(req, res, next) {
  try {
    const info = req.body;
    console.log(info)
    await DiseaseCondition.add(info);

    return res.status(201).json({
      success: true,
      message: "Se ha guardado la información de la condición correctamente.",
    });
  } catch (error) {
    console.log(`Error: ${error}`);
    return res.status(501).json({
      success: false,
      message: "Hubo un error con el registro de la condición.",
      error: error,
    });
  }
}

async function updateDiseaseCondition(req, res, next) {
  try {
    const info = req.body;
    const saved = await DiseaseCondition.readById(info.id);

    if (saved) {
      await DiseaseCondition.update(info);

      return res.status(201).json({
        success: true,
        message: "Actualización exitosa.",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "No existe la condición",
      });
    }
  } catch (error) {
    console.log("Error: " + error);
    return res.status(501).json({
      success: false,
      message: "Hubo un error con la actualización de la condición.",
      error: error,
    });
  }
}

async function deleteDiseaseCondition(req, res, next) {
  try {
    const id = req.body.id;
    await DiseaseCondition.delete(id);
    return res.status(200).json({ message: "Condición eliminada con éxito" });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al eliminar la condición" });
  }
}

module.exports = {
  getAll,
  getOneDiseaseCondition,
  addDiseaseCondition,
  updateDiseaseCondition,
  deleteDiseaseCondition,
};
