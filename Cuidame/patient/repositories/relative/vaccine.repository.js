const VaccineModel = require("../../models/relative/vaccine.model");
const pool = require("../../../../utils/connection");


exports.createVaccine = async (data) => {
  const { id_paciente, vacuna, created_at, updated_at } = data;
  const query = 'INSERT INTO vacunas (id_paciente, vacuna, created_at, updated_at) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [id_paciente, vacuna, created_at, updated_at];
  const result = await pool.query(query, values);
  const { id } = result.rows[0];
  return new VaccineModel(id, id_paciente, vacuna, created_at, updated_at);
};

exports.getVaccine = async (id) => {
  const query = 'SELECT * FROM vacunas WHERE id = $1';
  const result = await pool.query(query, [id]);
  if (!result.rows.length) {
    return null;
  }
  const { id_paciente, vacuna, created_at, updated_at } = result.rows[0];
  return new VaccineModel(id, id_paciente, vacuna, created_at, updated_at);
};

exports.getVaccineByRelative = async (id) => {
  const query = 'SELECT * FROM vacunas WHERE id_paciente = $1';
  const result = await pool.query(query, [id]);
  if (!result.rows.length) {
    return null;
  }
  return result.rows.map(row => {
    const { id, id_paciente, vacuna, created_at, updated_at } = row;
    return new VaccineModel(id, id_paciente, vacuna, created_at, updated_at);
  });
};


exports.getAllVaccines = async () => {
  const query = 'SELECT * FROM vacunas';
  const result = await pool.query(query);
  if (!result.rows.length) {
    return null;  
  }
  return result.rows.map(row => {
    const { id, id_paciente, vacuna, created_at, updated_at } = row;
    return new VaccineModel(id, id_paciente, vacuna, created_at, updated_at);
  });
};

exports.updateVaccine = async (id, data) => {
  const { id_paciente, vacuna, created_at, updated_at } = data;
  const query = 'UPDATE vacunas SET id_paciente = $1, vacuna = $2, created_at = $3, updated_at = $4 WHERE id = $5 RETURNING *';
  const values = [id_paciente, vacuna, created_at, updated_at, id];
  const result = await pool.query(query, values);
  return new VaccineModel(id, id_paciente, vacuna, created_at, updated_at);
};

exports.deleteVaccine = async (id) => {
  const selectQuery = 'SELECT * FROM vacunas WHERE id = $1';
  const deleteQuery = 'DELETE FROM vacunas WHERE id = $1';

  try {
    const selectResult = await pool.query(selectQuery, [id]);
    if (!selectResult.rows.length) {
      return false; 
    }

    await pool.query(deleteQuery, [id]);
    return true;  
  } catch (error) {
    console.error("Error al eliminar vacuna:", error);
    throw error;
  }
};
