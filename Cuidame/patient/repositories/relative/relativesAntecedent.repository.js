const pool = require("../../../../utils/connection");
const RelativeAntecedentModel = require("../../models/relative/relativesAntecedent.model");

exports.createRelativeAntecedent = async (data) => {

  const { id_paciente, tipo_antecedente, parentesco, descripcion_antecedente, created_at, updated_at } = data;

  const query = 'INSERT INTO atecedentes_familiares (id_paciente, tipo_antecedente, parentesco, descripcion_antecedente, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  const values = [id_paciente, tipo_antecedente, parentesco, descripcion_antecedente, created_at, updated_at];
  const result = await pool.query(query, values);
  const { id } = result.rows[0];
  return new RelativeAntecedentModel(id, id_paciente, tipo_antecedente, parentesco, descripcion_antecedente, created_at, updated_at);
};

exports.getRelativeAntecedent = async (id) => {
  const query = 'SELECT * FROM atecedentes_familiares WHERE id = $1';
  const result = await pool.query(query, [id]);
  if (!result.rows.length) {
    return null;
  }
  const { id_paciente, tipo_antecedente, parentesco, descripcion_antecedente, created_at, updated_at } = result.rows[0];
  return new RelativeAntecedentModel(id, id_paciente, tipo_antecedente, parentesco, descripcion_antecedente, created_at, updated_at);
};


exports.getRelativeAntecedentByRelative = async (id) => {
  const query = 'SELECT * FROM atecedentes_familiares WHERE id_paciente = $1';
  const result = await pool.query(query, [id]);
  if (!result.rows.length) {
    return null;
  }
  const { id_paciente, tipo_antecedente, parentesco, descripcion_antecedente, created_at, updated_at } = result.rows[0];
  return new RelativeAntecedentModel(id, id_paciente, tipo_antecedente, parentesco, descripcion_antecedente, created_at, updated_at);
};

exports.getAllRelativeAntecedents = async () => {
  const query = 'SELECT * FROM atecedentes_familiares';
  const result = await pool.query(query);
  if (!result.rows.length) {
    return null;  
  }
  return result.rows.map(row => {
    const { id, id_paciente, tipo_antecedente, parentesco, descripcion_antecedente, created_at, updated_at } = row;
    return new RelativeAntecedentModel(id, id_paciente, tipo_antecedente, parentesco, descripcion_antecedente, created_at, updated_at);
  });
};

exports.updateRelativeAntecedent = async (id, data) => {
  const { id_paciente, tipo_antecedente, parentesco, descripcion_antecedente, created_at, updated_at } = data;
  const query = 'UPDATE atecedentes_familiares SET id_paciente = $1, tipo_antecedente = $2, parentesco = $3, descripcion_antecedente = $4, created_at = $5, updated_at = $6 WHERE id = $7 RETURNING *';
  const values = [id_paciente, tipo_antecedente, parentesco, descripcion_antecedente, created_at, updated_at, id];
  const result = await pool.query(query, values);
  return new RelativeAntecedentModel(id, id_paciente, tipo_antecedente, parentesco, descripcion_antecedente, created_at, updated_at);
};

exports.deleteRelativeAntecedent = async (id) => {
  const selectQuery = 'SELECT * FROM atecedentes_familiares WHERE id = $1';
  const deleteQuery = 'DELETE FROM atecedentes_familiares WHERE id = $1';

  try {
    const selectResult = await pool.query(selectQuery, [id]);
    if (!selectResult.rows.length) {
      return false; 
    }

    await pool.query(deleteQuery, [id]);
    return true;  
  } catch (error) {
    console.error("Error al eliminar antecedente familiar:", error);
    throw error;
  }
};
