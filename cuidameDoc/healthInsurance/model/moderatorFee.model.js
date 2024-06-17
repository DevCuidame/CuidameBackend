class ModeratorFee {
    constructor(id, health_insurance_id, name, price, income_range, category, copayment) {
      this.id = id;
      this.health_insurance_id = health_insurance_id;
      this.name = name;
      this.price = price;
      this.income_range = income_range;
      this.category = category;
      this.copayment = copayment;
    }
  }
  
  module.exports = ModeratorFee;
  