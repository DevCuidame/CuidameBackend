const pool = require("../../../../utils/connection");
const MedicamentModel = require("../../models/relative/medicament.model");

exports.createMedicament = async (data) => {
  const { id_paciente, medicamento, laboratorio, formula, created_at, updated_at } = data;
  const query = 'INSERT INTO medicamentos (id_paciente, medicamento, laboratorio, formula, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  const values = [id_paciente, medicamento, laboratorio, formula, created_at, updated_at];
  const result = await pool.query(query, values);
  const { id } = result.rows[0];
  return new MedicamentModel(id, id_paciente, medicamento, laboratorio, formula, created_at, updated_at);
};

exports.getMedicament = async (id) => {
  const query = 'SELECT * FROM medicamentos WHERE id = $1';
  const result = await pool.query(query, [id]);
  if (!result.rows.length) {
    return null;
  }
  const { id_paciente, medicamento, laboratorio, formula, created_at, updated_at } = result.rows[0];
  return new MedicamentModel(id, id_paciente, medicamento, laboratorio, formula, created_at, updated_at);
};

exports.getMedicamentByRelative = async (id) => {
  const query = 'SELECT * FROM medicamentos WHERE id_paciente = $1';
  const result = await pool.query(query, [id]);
  if (!result.rows.length) {
    return null;
  }
  const { id_paciente, medicamento, laboratorio, formula, created_at, updated_at } = result.rows[0];
  return new MedicamentModel(id, id_paciente, medicamento, laboratorio, formula, created_at, updated_at);
};

exports.getAllMedicaments = async () => {
  const query = 'SELECT * FROM medicamentos';
  const result = await pool.query(query);
  if (!result.rows.length) {
    return null;  
  }
  return result.rows.map(row => {
    const { id, id_paciente, medicamento, laboratorio, formula, created_at, updated_at } = row;
    return new MedicamentModel(id, id_paciente, medicamento, laboratorio, formula, created_at, updated_at);
  });
};

exports.updateMedicament = async (id, data) => {
  const { id_paciente, medicamento, laboratorio, formula, created_at, updated_at } = data;

  const query = 'UPDATE medicamentos SET id_paciente = $1, medicamento = $2, laboratorio = $3, formula = $4, created_at = $5, updated_at = $6 WHERE id = $7 RETURNING *';
  const values = [id_paciente, medicamento, laboratorio, formula, created_at, updated_at, id];
  const result = await pool.query(query, values);
  return new MedicamentModel(id, id_paciente, medicamento, laboratorio, formula, created_at, updated_at);
};

exports.deleteMedicament = async (id) => {
  const selectQuery = 'SELECT * FROM medicamentos WHERE id = $1';
  const deleteQuery = 'DELETE FROM medicamentos WHERE id = $1';

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
