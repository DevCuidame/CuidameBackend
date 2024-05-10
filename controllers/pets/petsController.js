const Pet = require("../../models/pets/pet");
const fs = require("fs/promises");

// ------------------------------ PETS ----------------------------------

async function getOwnerxPet(req, res, next) {
  try {
    const hashcode = req.body.hashcode;
    const pet = await Pet.getOwnerxPet(hashcode);
    return res.status(201).json(pet);
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: "Error al obtener el usuario.",
    });
  }
}

async function getAllPets(req, res, next) {
  try {
    const id = req.body.id;
    const pets = await Pet.getAllPets(id);

    return res.status(201).json(pets);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error al traer todas las mascotas. Error: " + error,
    });
  }
}

async function getOnePet(req, res, next) {
  try {
    const id = req.body.id;
    const pet = await Pet.getPet(id);
    //console.log('ID', id, 'PET: ', pet)
    return res.status(201).json(pet);
  } catch (error) {
    console.log(`Error: ${error}`);
    return res.status(501).json({
      success: false,
      message: "Error al obtener la mascota.",
    });
  }
}

async function getOwner(req, res, next) {
  try {
    const id = req.body.id;
    const owner = await Pet.getOwner(id);
    //console.log(id, owner);
    return res.status(201).json(owner);
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: "Error al obtener el usuario.",
    });
  }
}

async function setpetIdentifier(req, res, next) {
  try {
    const { id } = req.body;
    // console.log("IDENTIFICADOR", id);
    const info = {
      id: id,
      petid: "",
    };

    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    info.petid = `${id}${day}${month}${year}`;
    console.log(info);

    await Pet.SetPetID(info);

    return res.status(201).json({
      success: true,
      message: "Se ha guardado la identificación de tu mascota correctamente.",
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      success: false,
      message: "Hubo un error con el identificador de tu mascota.",
      error: error,
    });
  }
}

async function addPet(req, res, next) {
  try {
    const petinfo = req.body;
    const { hashcode } = await Pet.getOneQr();
    
    if (petinfo.hashcode === '' || petinfo.hashcode == null) petinfo.hashcode = hashcode;

    if (petinfo.raza === "" || petinfo.raza == null) petinfo.raza = "Criolla";

    console.log(petinfo);

    if (petinfo.hashcode == "") {
      return res.status(501).json({
        success: false,
        message: "No hay licencias para tu mascota.",
      });
    }


    const exists = await Pet.petByHashcode(petinfo.hashcode);
    if (exists) {
      return res.status(501).json({
        success: false,
        message: "Parece que existe otra mascota con un código idéntico.",
      });
    }

    const imageFile = req.file;
    // console.log(petinfo);

    // console.log(petinfo);
    // console.log(imageFile);
    if (imageFile) {
      petinfo.photoUrl = imageFile.path;
      petinfo.photoName = imageFile.filename;
    }
    // console.log(petinfo.photourl, petinfo.photoname);

    const petId = await Pet.addPet(petinfo);

  
    return res.status(201).json({
      success: true,
      message: "Se ha guardado la información de tu mascota correctamente.",
      id: petId,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      success: false,
      message: "Hubo un error con el registro de tu mascota.",
      error: error,
    });
  }
}

async function updatePet(req, res, next) {
  try {
    const petinfo = req.body;
    const imageFile = req.file;

    if (petinfo.raza === "" || petinfo.raza == null) petinfo.raza = "Criolla";

    // console.log("Mascota del FrontEnd", petinfo);

    const savedPet = await Pet.petById(petinfo.id);
    //console.log(savedPet);

    if (savedPet) {
      if (imageFile) {
        petinfo.photourl = imageFile.path;
        petinfo.photoname = imageFile.filename;
        //console.log("Mascota con la url editada", petinfo);

        //console.log("saved image", savedPet.photourl);
        //console.log("New image", petinfo.photourl);

        if (savedPet.photourl !== petinfo.photoUrl) {
          try {
            await fs.unlink(savedPet.photourl);
          } catch (error) {
            console.error("Error al eliminar la imagen anterior:", error);
          }
        }
      }
      //console.log("Mascota para actualizar", petinfo);

      await Pet.updatePet(petinfo);

      return res.status(201).json({
        success: true,
        message: "Actualización exitosa.",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "No existe la mascota",
      });
    }
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: "Hubo un error con la actualización de tu mascota.",
      error: error,
    });
  }
}

async function deletePet(req, res, next) {
  try {
    const id = req.body.id;
    const pet = await Pet.petById(id);
    try {
      await fs.unlink(pet.photourl);
    } catch (error) {
      console.error("Error al eliminar la imagen anterior:", error);
    }
    await Pet.deletePet(id);

    return res.status(200).json({ message: "Mascota eliminada con éxito" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al eliminar la mascota" });
  }
}

async function getHascode(req, res, next) {
  try {
    const code = req.body.code;
    const hashcode = await Pet.getHashcode(code);
    return res.status(201).json(hashcode);
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      success: false,
      message: "Error al obtener el hashcode de la mascota.",
    });
  }
}

async function getAgreement(req, res, next) {
  try {
    const hashcode = req.body.hashcode;
    const agreement = await Pet.getAgreement(hashcode);
    return res.status(201).json(agreement);
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: "Error al obtener la licencia de la mascota.",
    });
  }
}

async function createOrUpdatePet(req, res, next) {
  try {
    const petinfo = req.body;
    const imageFile = req.file;
    console.log(petinfo);
    // console.log(imageFile);
    if (imageFile) {
      petinfo.photoUrl = imageFile.path;
      petinfo.photoName = imageFile.filename;
    }

    const savedPet = await Pet.petById(petinfo.id);

    if (!savedPet) {
      // console.log(petinfo.photourl, petinfo.photoname);
      await Pet.addPet(petinfo);
      return res.status(201).json({
        success: true,
        message: "Se ha guardado la información de tu mascota correctamente.",
      });
    } else {
      if (imageFile) {
        petinfo.photourl = imageFile.path;
        petinfo.photoname = imageFile.filename;

        //console.log("saved image", savedPet.photourl);
        //console.log("New image", petinfo.photourl);

        if (savedPet.photourl !== petinfo.photoUrl) {
          try {
            await fs.unlink(savedPet.photourl);
          } catch (error) {
            console.error("Error al eliminar la imagen anterior:", error);
          }
        }
      }
      await Pet.updatePet(petinfo);

      return res.status(201).json({
        success: true,
        message: "Actualización exitosa.",
      });
    }
  } catch (error) {
    console.log(`Error: ${error}`);
    return res.status(501).json({
      success: false,
      message: "Hubo un error con el registro de tu mascota.",
      error: error,
    });
  }
}

module.exports = {
  getAllPets,
  getOnePet,
  getOwner,
  addPet,
  updatePet,
  deletePet,
  getHascode,
  createOrUpdatePet,
  getAgreement,
  setpetIdentifier,
  getOwnerxPet
};
