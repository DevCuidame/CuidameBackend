class AntecedentModel {
    constructor(id, id_paciente, tipo_antecedente, descripcion_antecedente, fecha_antecedente, created_at, updated_at) {
      this.id = id;
      this.id_paciente = id_paciente;
      this.tipo_antecedente = tipo_antecedente;
      this.descripcion_antecedente = descripcion_antecedente;
      this.fecha_antecedente = fecha_antecedente;
      this.created_at = created_at;
      this.updated_at = updated_at;
    }
  }
  
  module.exports = AntecedentModel;
  