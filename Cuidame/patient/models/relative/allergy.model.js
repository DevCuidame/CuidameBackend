class AllergyModel {
    constructor(id, id_paciente, tipo_alergia, descripcion, created_at, updated_at) {
      this.id = id;
      this.id_paciente = id_paciente;
      this.tipo_alergia = tipo_alergia;
      this.descripcion = descripcion;
      this.created_at = created_at;
      this.updated_at = updated_at;
    }
  }
  
  module.exports = AllergyModel;
  