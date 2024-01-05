const Vaccine = require("../../models/pets/vaccine");
const fs = require("fs/promises");


// ------------------------------ VACCINES ----------------------------------

async function getAll(req, res, next) {
  try {
    const id = req.body.id;
    const result = await Vaccine.read(id);

    return res.status(201).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error al traer todas las vacunas. Error: " + error,
    });
  }
}

async function getOneVaccine(req, res, next) {
  try {
    const id = req.body.id;
    const vaccine = await Vaccine.readById(id);
    return res.status(201).json(vaccine);
  } catch (error) {
    console.log(`Error: ${error}`);
    return res.status(501).json({
      success: false,
      message: "Error al obtener la vacuna.",
    });
  }
}

async function addVaccine(req, res, next) {
  try {
    const info = req.body;
    const imageFile = req.file;
    if (imageFile) {
      info.photoUrl = imageFile.path;
      info.photoName = imageFile.filename;
    }
    
    if (!info.nextDate) {
      info.nextDate = null;
    }
    
    console.log("VACUNA PARA AGREGAR", info);
    await Vaccine.add(info);
    return res.status(201).json({
      success: true,
      message: "Se ha guardado la información de la vacuna correctamente.",
    });
  } catch (error) {
    console.log(`Error: ${error}`);
    return res.status(501).json({
      success: false,
      message: "Hubo un error con el registro de la vacuna.",
      error: error,
    });
  }
}

async function updateVaccine(req, res, next) {
  try {
    const info = req.body;
    const imageFile = req.file;

    const saved = await Vaccine.readById(info.id);

    if (saved) {
      if (imageFile) {
        info.photourl = imageFile.path;
        info.photoname = imageFile.filename;

        if (saved.photourl !== info.photoUrl) {
          try {
            await fs.unlink(saved.photourl);
          } catch (error) {
            console.error("Error al eliminar la imagen anterior:", error);
          }
        }
      }
      await Vaccine.update(info);

      return res.status(201).json({
        success: true,
        message: "Actualización exitosa.",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "No existe la vacuna",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      success: false,
      message: "Hubo un error con la actualización de la vacuna.",
      error: error,
    });
  }
}

async function deleteVaccine(req, res, next) {
  try {
    const id = req.body.id;
    const vac = await Vaccine.getOneVaccine(id);
    try {
      await fs.unlink(vac.photourl);
    } catch (error) {
      console.error("Error al eliminar la imagen anterior:", error);
    }
    await Vaccine.delete(id);
    return res.status(200).json({ message: "Vacuna eliminada con éxito" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al eliminar la vacuna" });
  }
}

async function createOrUpdate(req, res, next) {
  try {
    const info = req.body;
    const imageFile = req.file;
    //console.log(info);
    // console.log(imageFile);
    if (imageFile) {
      info.photoUrl =  imageFile.path;
      info.photoName = imageFile.filename;
    }

    const saved = await Vaccine.readById(info.id);

    if (!saved) {
      // console.log(info.photourl, info.photoname);
      await Vaccine.add(info);
      return res.status(201).json({
        success: true,
        message: "Se ha guardado la información de la vacuna correctamente.",
      });
    } else {
      if (imageFile) {
        info.photourl = imageFile.path;
        info.photoname = imageFile.filename;

        //console.log("saved image", saved.photourl);
        //console.log("New image", info.photourl);

        if (saved.photourl !== info.photoUrl) {
          try {
            await fs.unlink(saved.photourl);
          } catch (error) {
            console.error("Error al eliminar la imagen anterior:", error);
          }
        }

      }
      await Vaccine.update(info);

      return res.status(201).json({
        success: true,
        message:
          "Actualización exitosa.",
      });
    }
  } catch (error) {
    console.log(`Error: ${error}`);
    return res.status(501).json({
      success: false,
      message: "Hubo un error con el registro de la vacuna.",
      error: error,
    });
  }
}

module.exports = {
  getAll,
  getOneVaccine,
  addVaccine,
  updateVaccine,
  deleteVaccine,
  createOrUpdate
};
