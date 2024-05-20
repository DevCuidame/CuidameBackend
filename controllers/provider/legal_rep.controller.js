const service = require("../../services/legal_representative.service");

exports.createLegalRep = async (req, res) => {
  try {
    const exists = await service.getLegalRep(req.body.provider_id)

    if (exists.length > 0) {
      return res.status(400).json({message: "Ya tienes asociado un representante legal."});
    }
    const newLegalRep = await service.createLegalRep(req.body);
    return res.status(200).json({message: "!Representante Legal guardado!", newLegalRep, success: true});
  } catch (error) {
    res.status(400).json({message: "Ha ocurrido un error al guardar el representante legal.", error: error.message, success: false });
  }
};