class DoctorService {
    constructor(id, name, visit_price, doctor_id, discount) {
      this.id = id;
      this.name = name;
      this.visit_price = visit_price;
      this.doctor_id = doctor_id;
      this.discount = discount;
    }
  }
  
  module.exports = DoctorService;
  