const legalRepRepository = require("../repositories/legal_representative.repository");

exports.createLegalRep = async (data) => {
  return legalRepRepository.createLegalRep(data);
};

exports.getLegalRep = async (id) => {
  return legalRepRepository.getLegalRep(id);
};
