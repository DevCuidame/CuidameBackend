class PaymentBill {
    constructor(id, health_insurance_id, relative_id, doctor_service_id) {
      this.id = id;
      this.health_insurance_id = health_insurance_id;
      this.relative_id = relative_id;
      this.doctor_service_id = doctor_service_id;
    }
  }
  
  module.exports = PaymentBill;
  