const pool = require("../../../../utils/connection");
const AllergyModel = require("../../models/relative/allergy.model");

exports.createAllergy = async (data) => {
  const {id_paciente, tipo_alergia, descripcion, created_at, updated_at} = data;
  const query = 'INSERT INTO alergias (id_paciente, tipo_alergia, descripcion, created_at, updated_at) VALUES ($1, $2, $3, $4, $5) RETURNING *';
  const values = [id_paciente, tipo_alergia, descripcion, created_at, updated_at];
  const result = await pool.query(query, values);
  const { id } = result.rows[0];
  return new AllergyModel(id, id_paciente, tipo_alergia, descripcion, created_at, updated_at);
};

exports.getAllergy = async (id) => {
  const query = 'SELECT * FROM alergias WHERE id = $1';
  const result = await pool.query(query, [id]);
  if (!result.rows.length) {
    return null;
  }
  const { id_paciente, tipo_alergia, descripcion, created_at, updated_at } = result.rows[0];
  return new AllergyModel(id, id_paciente, tipo_alergia, descripcion, created_at, updated_at);
};

exports.getAllergyByPaciente = async (id) => {
  const query = 'SELECT * FROM alergias WHERE id_paciente = $1';
  const result = await pool.query(query, [id]);
  if (!result.rows.length) {
    return null;
  }
  const { id_paciente, tipo_alergia, descripcion, created_at, updated_at } = result.rows[0];
  return new AllergyModel(id, id_paciente, tipo_alergia, descripcion, created_at, updated_at);
};

exports.getAllAllergies = async () => {
  const query = 'SELECT * FROM alergias';
  const result = await pool.query(query);
  if (!result.rows.length) {
    return null;  
  }
  return result.rows.map(row => {
    const { id, id_paciente, tipo_alergia, descripcion, created_at, updated_at } = row;
    return new AllergyModel(id, id_paciente, tipo_alergia, descripcion, created_at, updated_at);
  });
};

exports.updateAllergy = async ( id, data ) => {
  const {id_paciente, tipo_alergia, descripcion, created_at, updated_at} = data;
  const query = 'UPDATE alergias SET id_paciente = $1, tipo_alergia = $2, descripcion = $3, created_at = $4, updated_at = $5 WHERE id = $6 RETURNING *';
  const values = [id_paciente, tipo_alergia, descripcion, created_at, updated_at, id];
  const result = await pool.query(query, values);
  return new AllergyModel(id, id_paciente, tipo_alergia, descripcion, created_at, updated_at);
};

exports.deleteAllergy = async (id) => {
  const selectQuery = 'SELECT * FROM alergias WHERE id = $1';
  const deleteQuery = 'DELETE FROM alergias WHERE id = $1';

  try {
    const selectResult = await pool.query(selectQuery, [id]);
    if (!selectResult.rows.length) {
      return false; 
    }

    await pool.query(deleteQuery, [id]);
    return true;  
  } catch (error) {
    console.error("Error al eliminar alergia:", error);
    throw error;
  }
};
