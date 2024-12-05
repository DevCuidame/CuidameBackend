class Order {
  constructor(
    id,
    medicament_name,
    date_order,
    duration,
    dose,
    frequency,
    quantity,
    authorized,
    mipres,
    controlled_substances,
    eps_authorization,
    pharmacy,
    date_auth,
    phone,
    address,
    description,
    delivery_status,
    delivery_date,
    comments,
    id_patient
  ) {
    this.id = id;
    this.medicament_name = medicament_name;
    this.date_order = date_order;
    this.duration = duration;
    this.dose = dose;
    this.frequency = frequency;
    this.quantity = quantity;
    this.authorized = authorized;
    this.mipres = mipres;
    this.controlled_substances = controlled_substances;
    this.eps_authorization = eps_authorization;
    this.pharmacy = pharmacy;
    this.date_auth = date_auth;
    this.phone = phone;
    this.address = address;
    this.description = description;
    this.delivery_status = delivery_status;
    this.delivery_date = delivery_date;
    this.comments = comments;
    this.id_patient = id_patient;
  }
}

module.exports = Order;
