class MedicalConsultation {
    constructor(id, relative_id, type, city_id, date, reason) {
      this.id = id;
      this.relative_id = relative_id;
      this.type = type;
      this.city_id = city_id;
      this.date = date;
      this.reason = reason;
    }
  }
  
  module.exports = MedicalConsultation;
  