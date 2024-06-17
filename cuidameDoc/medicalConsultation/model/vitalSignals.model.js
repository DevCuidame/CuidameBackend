class VitalSignals {
    constructor(id, medical_consult_id, weight, size, imc, blood_pressure, heart_frequency, system, body_area, symptom, description) {
      this.id = id;
      this.medical_consult_id = medical_consult_id;
      this.weight = weight;
      this.size = size;
      this.imc = imc;
      this.blood_pressure = blood_pressure;
      this.heart_frequency = heart_frequency;
      this.system = system;
      this.body_area = body_area;
      this.symptom = symptom;
      this.description = description;
    }
  }
  
  module.exports = VitalSignals;
  