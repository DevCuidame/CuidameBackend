class MedicamentModel {
    constructor(id, id_paciente, medicamento, laboratorio, formula, created_at, updated_at) {
      this.id = id;
      this.id_paciente = id_paciente;
      this.medicamento = medicamento;
      this.laboratorio = laboratorio;
      this.formula = formula;
      this.created_at = created_at;
      this.updated_at = updated_at;
    }
  }
  
  module.exports = MedicamentModel;
  