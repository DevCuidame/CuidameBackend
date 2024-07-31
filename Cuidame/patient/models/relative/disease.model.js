class DiseaseModel {
    constructor(id, id_paciente, enfermedad, created_at, updated_at) {
      this.id = id;
      this.id_paciente = id_paciente;
      this.enfermedad = enfermedad;
      this.created_at = created_at;
      this.updated_at = updated_at;
    }
  }
  
  module.exports = DiseaseModel;
  