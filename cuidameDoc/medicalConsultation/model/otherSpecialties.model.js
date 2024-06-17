class OtherSpecialties {
    constructor(id, medical_consult_id, type, date, concept, result, pathology_report) {
      this.id = id;
      this.medical_consult_id = medical_consult_id;
      this.type = type;
      this.date = date;
      this.concept = concept;
      this.result = result;
      this.pathology_report = pathology_report;
    }
  }
  
  module.exports = OtherSpecialties;
  