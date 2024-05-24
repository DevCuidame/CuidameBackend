const Veterinarian = require("../../models/pets/veterinarian");

// ------------------------------ Veterinarian ----------------------------------

async function getAll(req, res, next) {
  try {
    const id = req.body.id;
    const result = await Veterinarian.read(id);

    return res.status(201).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error al traer todos los Veterinarianos. Error: " + error,
    });
  }
}

async function getDatabase(req, res, next) {
  try {
    const vetRequest = req.body.vet;
    if (vetRequest === "veterinarians") {
      console.log(vetRequest);
      result = await Veterinarian.database();
    } else if (vetRequest === "bathroom") {
      console.log(vetRequest);

      result = await Veterinarian.getBathroomHairdresser();
    } else if (vetRequest === "hotel") {
      console.log(vetRequest);

      result = await Veterinarian.getHotelNursery();
    } else if (vetRequest === "wellness") {
      console.log(vetRequest);

      result = await Veterinarian.getWellnessSpa();
    }
    return res.status(201).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error al traer todos los Veterinarianos. Error: " + error,
    });
  }
}

async function getOneVeterinarian(req, res, next) {
  try {
    const id = req.body.id;
    const veterinarian = await Veterinarian.readById(id);
    return res.status(201).json(veterinarian);
  } catch (error) {
    console.log(`Error: ${error}`);
    return res.status(501).json({
      success: false,
      message: "Error al obtener el Veterinarinario.",
    });
  }
}

async function addVeterinarian(req, res, next) {
  try {
    const info = req.body;
    console.log("🚀 ~ addVeterinarian ~ info:", info)

    const exists = await Veterinarian.haveOne(info.pet_id);

    if (exists) {
      return res.status(400).json({
        success: true,
        message: "Solo puedes guardar un veterinario.",
      });
    }

    await Veterinarian.add(info);

    return res.status(201).json({
      success: true,
      message: "Se ha guardado la información del veterinario correctamente.",
    });
  } catch (error) {
    console.log(`Error: ${error}`);
    return res.status(501).json({
      success: false,
      message: "Hubo un error con el registro del veterinario.",
      error: error,
    });
  }
}

async function updateVeterinarian(req, res, next) {
  try {
    const info = req.body;
    console.log(info);

    const saved = await Veterinarian.readById(info.id);

    if (saved) {
      await Veterinarian.update(info);

      return res.status(201).json({
        success: true,
        message: "Actualización exitosa.",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "No existe el veterinario",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      success: false,
      message: "Hubo un error con la actualización del veterinario.",
      error: error,
    });
  }
}

async function deleteVeterinarian(req, res, next) {
  try {
    const id = req.body.id;
    const result = await Veterinarian.readById(id);

    if (!result) {
      return res.status(404).json({ message: "Veterinario no encontrado" });
    }

    await Veterinarian.delete(id);
    return res.status(200).json({ message: "Veterinario eliminado con éxito" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error al eliminar el Veterinario" });
  }
}

module.exports = {
  getAll,
  getOneVeterinarian,
  addVeterinarian,
  updateVeterinarian,
  deleteVeterinarian,
  getDatabase,
};
