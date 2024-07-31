class VaccineModel {
    constructor(id, id_paciente, vacuna, created_at, updated_at) {
      this.id = id;
      this.id_paciente = id_paciente;
      this.vacuna = vacuna;
      this.created_at = created_at;
      this.updated_at = updated_at;
    }
  }
  
  module.exports = VaccineModel;
  