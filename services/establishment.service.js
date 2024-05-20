const establishmentRepository = require("../repositories/establishment.repository");

exports.createEstablishment = async (data) => {
  return establishmentRepository.createEstablishment(data);
};

exports.getEstablishment = async (id) => {
  return establishmentRepository.getEstablishment(id);
};
