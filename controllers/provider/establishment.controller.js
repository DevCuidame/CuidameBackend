const service = require("../../services/establishment.service");

exports.createEstablishment = async (req, res) => {
  try {
    const exists = await service.getEstablishment(req.body.provider_id)

    if (exists.length > 0) {
      return res.status(400).json({message: "Ya tienes asociado un establecimiento."});
    }
    const data = await service.createEstablishment(req.body);
    return res.status(200).json({message: "!Establecimiento guardado!", data, success: true});
  } catch (error) {
    res.status(400).json({message: "Ha ocurrido un error al guardar el establecimeinto.", error: error.message, success: false });
  }
};