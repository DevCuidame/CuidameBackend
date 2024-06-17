class Population {
    constructor(id, first_name, last_name, identification_type, identification_number, age, gender, marital_status, place_of_birth, address, category, regiment_type, phone, occupation, status, position, contract_id) {
      this.id = id;
      this.first_name = first_name;
      this.last_name = last_name;
      this.identification_type = identification_type;
      this.identification_number = identification_number;
      this.age = age;
      this.gender = gender;
      this.marital_status = marital_status;
      this.place_of_birth = place_of_birth;
      this.address = address;
      this.category = category;
      this.regiment_type = regiment_type;
      this.phone = phone;
      this.occupation = occupation;
      this.status = status;
      this.position = position;
      this.contract_id = contract_id;
    }
  }
  
  module.exports = Population;
  