class Medication {
  constructor(
    id,
    name,
    description,
    quantity,
    dosage,
    frequency,
    manufacturer,
    expiration_date,
    prescription_required,
    category,
    administration_method,
    side_effects,
    storage_instructions,
    relative_id,
    created_at,
    updated_at
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.quantity = quantity;
    this.dosage = dosage;
    this.frequency = frequency;
    this.manufacturer = manufacturer;
    this.expiration_date = expiration_date;
    this.prescription_required = prescription_required;
    this.category = category;
    this.administration_method = administration_method;
    this.side_effects = side_effects;
    this.storage_instructions = storage_instructions;
    this.relative_id = relative_id;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}

module.exports = Medication;
