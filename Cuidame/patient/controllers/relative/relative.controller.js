// controllers/RelativeController.js
const relativeService = require("../../services/relative/relative.service");
const allergyService = require("../../services/relative/allergy.service");
const antecedentService = require("../../services/relative/antecedent.service");
const conditionService = require("../../services/relative/condition.service");
const diseaseService = require("../../services/relative/disease.service");
const medicamentService = require("../../services/relative/medicament.service");
const relativeAntecedentService = require("../../services/relative/relativesAntecedent.service");
const vaccineService = require("../../services/relative/vaccine.service");
const User = require("../../../../models/user");
const {
  buildImage,
  convertImageUrlToBase64,
} = require("../../../../utils/image.handler");

exports.createRelative = async (req, res) => {
  const { nanoid } = await import("nanoid");

  try {
    const data = req.body;

    const { hashcode } = await User.getOneQr();

    if (data.code === "" || data.code == null) data.code = hashcode;

    if (data.hashcode == "") {
      return res.status(400).json({
        success: false,
        message: "No hay licencias para la persona.",
      });
    }

    data.created_at = new Date();
    data.updated_at = new Date();

    const exists = await User.personByHashcode(data.code);
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Parece que existe otra persona con un código idéntico.",
      });
    }

    const sameNumberId = await relativeService.getRelativeByNit(data.numeroid);
    if (sameNumberId) {
      return res.status(400).json({
        success: false,
        message: "Un familiar ya tiene el número de identificación.",
      });
    }

    if (!data.imagebs64) {
      return res.status(400).json({
        success: false,
        message: "La imagen es requerida.",
      });
    }

    const pubName = req.body.pubname;
    const extension = pubName.substring(pubName.lastIndexOf("."));

    const priv_name = `RELATIVE_${nanoid(20)}`;
    try {
      await buildImage(priv_name, "profile", req.body.imagebs64);
    } catch (error) {
      return res.status(400).json({
        message: "Error al guardar la imagen.",
        error: error.message,
        success: false,
      });
    }

    data.photourl = "\\home\\developer\\uploads\\person\\profile\\" + priv_name + extension;

    const newRelative = await relativeService.createRelative(data);

    return res.status(200).json({
      message: "Familiar creado correctamente",
      newRelative: newRelative,
      success: true,
    });
  } catch (error) {
    console.log("🚀 ~ exports.createRelative= ~ error:", error);
    return res.status(400).json({
      message: "Error al crear el Familiar",
      error: error.message,
      success: false,
    });
  }
};

exports.getRelative = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("🚀 ~ exports.getRelative= ~ id:", id);
    const relative = await relativeService.getRelative(id);
    console.log("🚀 ~ exports.getRelative= ~ relative:", relative);

    if (!relative) {
      return res
        .status(404)
        .json({ error: "Familiar no encontrado", success: false });
    }

    return res.status(200).json({ relative, success: true });
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};

exports.getAllRelatives = async (req, res) => {
  try {
    const relatives = await relativeService.getAllRelatives();
    return res.status(200).json({ relatives, success: true });
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};

exports.updateRelative = async (req, res) => {
  const { nanoid } = await import("nanoid");
  try {
    const id = req.params.id;
    const data = req.body;
    console.log("🚀 ~ exports.updateRelative= ~ data:", data)
    let pubName = req.body.pubname;
    data.updated_at = new Date();

    const currentRelative = await relativeService.getRelative(id);


    if (!currentRelative) {
      return res.status(404).json({
        success: false,
        message: "Familiar no encontrado.",
      });
    }

    if (data.imagebs64 && data.imagebs64 !== currentRelative.imagebs64) {

      if(!pubName && req.body.nombre && currentRelative.photourl){
        const extension = currentRelative.photourl.lastIndexOf(".") !== -1 
            ? currentRelative.photourl.substring(currentRelative.photourl.lastIndexOf("."))
            : "";
        pubName = req.body.nombre.replace(/[^a-z0-9]/gi, '_') + extension;
    }
    

      const extension = pubName.substring(pubName.lastIndexOf("."));
      const priv_name = `RELATIVE_${nanoid(20)}`;

      try {
        await buildImage(priv_name, "profile", data.imagebs64);
        data.photourl = "\\home\\developer\\uploads\\person\\profile\\" + priv_name + extension;
      } catch (error) {
        return res.status(400).json({
          message: "Error al guardar la imagen.",
          error: error.message,
          success: false,
        });
      }
    }

    const updatedRelative = await relativeService.updateRelative(id, data);

    return res.status(200).json({
      message: "Familiar actualizado correctamente",
      updatedRelative: updatedRelative,
      success: true,
    });
  } catch (error) {
    console.log("🚀 ~ exports.updateRelative= ~ error:", error);
    return res.status(400).json({
      message: "Error al actualizar el Familiar",
      error: error.message,
      success: false,
    });
  }
};

exports.deleteRelative = async (req, res) => {
  try {
    const id = req.params.id;
    await relativeService.deleteRelative(id);

    return res
      .status(200)
      .json({ message: "Familiar eliminado correctamente", success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message, success: false });
  }
};

exports.getRelativeWithAllInfo = async (req, res) => {
  try {
    const id = req.params.id;
    const relative = await relativeService.getRelative(id);

    if (!relative) {
      return res
        .status(404)
        .json({ error: "Familiar no encontrado", success: false });
    }

    // Fetch related data
    const antecedents = await antecedentService.getAntecedentByRelative(id);
    const conditions = await conditionService.getConditionByRelative(id);
    const diseases = await diseaseService.getDiseaseByRelative(id);
    const medicaments = await medicamentService.getMedicamentByRelative(id);
    const vaccines = await vaccineService.getVaccineByRelative(id);
    const allergies = await allergyService.getAllergyByPaciente(id);
    const relativeAntecedent =
      await relativeAntecedentService.getRelativeAntecedentByRelative(id);

    relative.allergies = allergies;
    relative.antecedents = antecedents;
    relative.conditions = conditions;
    relative.diseases = diseases;
    relative.medicaments = medicaments;
    relative.relativeAntecedent = relativeAntecedent;
    relative.vaccines = vaccines;

    return res.status(200).json({
      relative,
      allergies,
      antecedents,
      conditions,
      diseases,
      medicaments,
      relativeAntecedent,
      vaccines,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};
