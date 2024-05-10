const veterinary_clinicsRepository = require('../repositories/veterinary_clinics.repository');

exports.getAll = async () => {
  return veterinary_clinicsRepository.getAll();
};


exports.getByService = async (value) => {
    return veterinary_clinicsRepository.getByService(value);
  };
  