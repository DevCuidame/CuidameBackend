class Contract {
    constructor(id, health_insurance_id, type, start_date, end_date) {
      this.id = id;
      this.health_insurance_id = health_insurance_id;
      this.type = type;
      this.start_date = start_date;
      this.end_date = end_date;
    }
  }
  
  module.exports = Contract;
  