class Doctor {
  constructor(
    id,
    first_name,
    last_name,
    identification_type,
    identification_number,
    city_id,
    address,
    phone,
    medical_record,
    medical_specialist,
    landline_phone,
    note,
    rating
  ) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.identification_type = identification_type;
    this.identification_number = identification_number;
    this.city_id = city_id;
    this.address = address;
    this.phone = phone;
    this.medical_record = medical_record;
    this.medical_specialist = medical_specialist;
    this.landline_phone = landline_phone;
    this.note = note;
    this.rating = rating;
  }
}

module.exports = Doctor;
