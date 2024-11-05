const pool = require("../../../utils/connection");
const Medication = require("../../models/relative/medication.model");

exports.createMedication = async (data) => {
  const {
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
  } = data;
  const query = `INSERT INTO medications (name, description, quantity, dosage, frequency, manufacturer, expiration_date, prescription_required, category, administration_method, side_effects, storage_instructions, relative_id) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`;
  const values = [
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
  ];
  const result = await pool.query(query, values);
  const { id } = result.rows[0];
  return new Medication(id, ...values);
};

exports.getMedication = async (id) => {
  const query = "SELECT * FROM medications WHERE id = $1";
  const result = await pool.query(query, [id]);
  if (!result.rows.length) {
    return null;
  }
  return new Medication(...Object.values(result.rows[0]));
};

exports.getAllMedications = async () => {
  const query = "SELECT * FROM medications";
  const result = await pool.query(query);
  if (!result.rows.length) {
    return null;
  }
  return result.rows.map((row) => new Medication(...Object.values(row)));
};

exports.updateMedication = async (id, data) => {
  const {
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
  } = data;
  const query = `UPDATE medications SET 
    name = $1, description = $2, quantity = $3, dosage = $4, frequency = $5, manufacturer = $6, expiration_date = $7, 
    prescription_required = $8, category = $9, administration_method = $10, side_effects = $11, storage_instructions = $12, 
    relative_id = $13 WHERE id = $14 RETURNING *`;
  const values = [
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
    id,
  ];
  const result = await pool.query(query, values);
  return new Medication(...Object.values(result.rows[0]));
};

exports.deleteMedication = async (id) => {
  const selectQuery = "SELECT * FROM medications WHERE id = $1";
  const deleteQuery = "DELETE FROM medications WHERE id = $1";

  try {
    const selectResult = await pool.query(selectQuery, [id]);
    if (!selectResult.rows.length) {
      return false;
    }

    await pool.query(deleteQuery, [id]);
    return true;
  } catch (error) {
    console.error("Error al eliminar medicamento:", error);
    throw error;
  }
};
