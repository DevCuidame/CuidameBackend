class Relative {
    constructor(id, user_id, doctor_id, first_name, last_name, identification_type, identification_number, age, gender, marital_status, place_of_birth, city_id, address, phone, occupation, position, health_insurance_id, company_id, status) {
      this.id = id;
      this.user_id = user_id;
      this.doctor_id = doctor_id;
      this.first_name = first_name;
      this.last_name = last_name;
      this.identification_type = identification_type;
      this.identification_number = identification_number;
      this.age = age;
      this.gender = gender;
      this.marital_status = marital_status;
      this.place_of_birth = place_of_birth;
      this.city_id = city_id;
      this.address = address;
      this.phone = phone;
      this.occupation = occupation;
      this.position = position;
      this.health_insurance_id = health_insurance_id;
      this.company_id = company_id;
      this.status = status;
    }
  }
  
  module.exports = Relative;
  