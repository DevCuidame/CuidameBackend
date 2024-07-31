class ConditionModel {
    constructor(id, id_paciente, discapacidad, embarazada, cicatrices_descripcion, tatuajes_descripcion, created_at, updated_at) {
      this.id = id;
      this.id_paciente = id_paciente;
      this.discapacidad = discapacidad;
      this.embarazada = embarazada;
      this.cicatrices_descripcion = cicatrices_descripcion;
      this.tatuajes_descripcion = tatuajes_descripcion;
      this.created_at = created_at;
      this.updated_at = updated_at;
    }
  }
  
  module.exports = ConditionModel;
  