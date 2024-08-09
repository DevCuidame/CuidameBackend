const pool = require("../../../../utils/connection");
const DiseaseModel = require("../../models/relative/disease.model");

exports.createDisease = async (data) => {
  const { id_paciente, enfermedad } = data;
  let created_at = new Date()
  let updated_at = new Date()
  const query = 'INSERT INTO enfermedades (id_paciente, enfermedad, created_at, updated_at) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [id_paciente, enfermedad, created_at, updated_at];
  const result = await pool.query(query, values);
  const { id } = result.rows[0];
  return new DiseaseModel(id, id_paciente, enfermedad, created_at, updated_at);
};

exports.getDisease = async (id) => {
  const query = 'SELECT * FROM enfermedades WHERE id = $1';
  const result = await pool.query(query, [id]);
  if (!result.rows.length) {
    return null;
  }
  const { id_paciente, enfermedad, created_at, updated_at } = result.rows[0];
  return new DiseaseModel(id, id_paciente, enfermedad, created_at, updated_at);
};

exports.getDiseaseByRelative = async (id) => {
  const query = 'SELECT * FROM enfermedades WHERE id_paciente = $1';
  const result = await pool.query(query, [id]);
  if (!result.rows.length) {
    return null;
  }
  return result.rows.map(row => {
    const { id, id_paciente, enfermedad, created_at, updated_at } = row;
    return new DiseaseModel(id, id_paciente, enfermedad, created_at, updated_at);
  });
};

exports.getAllDiseases = async () => {
  const query = 'SELECT * FROM enfermedades';
  const result = await pool.query(query);
  if (!result.rows.length) {
    return null;  
  }
  return result.rows.map(row => {
    const { id, id_paciente, enfermedad, created_at, updated_at } = row;
    return new DiseaseModel(id, id_paciente, enfermedad, created_at, updated_at);
  });
};

exports.updateDisease = async (id, data) => {
  const { id_paciente, enfermedad } = data;
  let created_at = new Date()
  let updated_at = new Date()
  const query = 'UPDATE enfermedades SET id_paciente = $1, enfermedad = $2, created_at = $3, updated_at = $4 WHERE id = $5 RETURNING *';
  const values = [id_paciente, enfermedad, created_at, updated_at, id];
  const result = await pool.query(query, values);
  return new DiseaseModel(id, id_paciente, enfermedad, created_at, updated_at);
};


exports.deleteDisease = async (id) => {
  const selectQuery = 'SELECT * FROM enfermedades WHERE id = $1';
  const deleteQuery = 'DELETE FROM enfermedades WHERE id = $1';

  try {
    const selectResult = await pool.query(selectQuery, [id]);
    if (!selectResult.rows.length) {
      return false; 
    }

    await pool.query(deleteQuery, [id]);
    return true;  
  } catch (error) {
    console.error("Error al eliminar enfermedad:", error);
    throw error;
  }
};
