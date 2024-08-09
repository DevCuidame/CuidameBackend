const AntecedentModel = require("../../models/relative/antecedent.model");
const pool = require("../../../../utils/connection");


exports.createAntecedent = async (data) => {
  const { id_paciente, tipo_antecedente, descripcion_antecedente, fecha_antecedente, created_at, updated_at } = data;
  const query = 'INSERT INTO antecedentes (id_paciente, tipo_antecedente, descripcion_antecedente, fecha_antecedente, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  const values = [id_paciente, tipo_antecedente, descripcion_antecedente, fecha_antecedente, created_at, updated_at];
  const result = await pool.query(query, values);
  const { id } = result.rows[0];
  return new AntecedentModel(id, id_paciente, tipo_antecedente, descripcion_antecedente, fecha_antecedente, created_at, updated_at);
};

exports.getAntecedent = async (id) => {
  const query = 'SELECT * FROM antecedentes WHERE id = $1';
  const result = await pool.query(query, [id]);
  if (!result.rows.length) {
    return null;
  }
  const { id_paciente, tipo_antecedente, descripcion_antecedente, fecha_antecedente, created_at, updated_at } = result.rows[0];
  return new AntecedentModel(id, id_paciente, tipo_antecedente, descripcion_antecedente, fecha_antecedente, created_at, updated_at);
};

exports.getAntecedentByRelative = async (id) => {
  const query = 'SELECT * FROM antecedentes WHERE id_paciente = $1';
  const result = await pool.query(query, [id]);

  if (!result.rows.length) {
    return []; 
  }

  return result.rows.map(row => {
    const { id, id_paciente, tipo_antecedente, descripcion_antecedente, fecha_antecedente, created_at, updated_at } = row;
    return new AntecedentModel(id, id_paciente, tipo_antecedente, descripcion_antecedente, fecha_antecedente, created_at, updated_at);
  });
};



exports.getAllAntecedents = async () => {
  const query = 'SELECT * FROM antecedentes';
  const result = await pool.query(query);
  if (!result.rows.length) {
    return null;  
  }
  return result.rows.map(row => {
    const { id, id_paciente, tipo_antecedente, descripcion_antecedente, fecha_antecedente, created_at, updated_at } = row;
    return new AntecedentModel(id, id_paciente, tipo_antecedente, descripcion_antecedente, fecha_antecedente, created_at, updated_at);
  });
};

exports.updateAntecedent = async (id, data) => {

  const { id_paciente, tipo_antecedente, descripcion_antecedente, fecha_antecedente, created_at, updated_at } = data;

  const query = 'UPDATE antecedentes SET id_paciente = $1, tipo_antecedente = $2, descripcion_antecedente = $3, fecha_antecedente = $4, created_at = $5, updated_at = $6 WHERE id = $7 RETURNING *';
  const values = [id_paciente, tipo_antecedente, descripcion_antecedente, fecha_antecedente, created_at, updated_at, id];
  const result = await pool.query(query, values);
  return new AntecedentModel(id, id_paciente, tipo_antecedente, descripcion_antecedente, fecha_antecedente, created_at, updated_at);
};

exports.deleteAntecedent = async (id) => {
  const selectQuery = 'SELECT * FROM antecedentes WHERE id = $1';
  const deleteQuery = 'DELETE FROM antecedentes WHERE id = $1';

  try {
    const selectResult = await pool.query(selectQuery, [id]);
    if (!selectResult.rows.length) {
      return false; 
    }

    await pool.query(deleteQuery, [id]);
    return true;  
  } catch (error) {
    console.error("Error al eliminar antecedente:", error);
    throw error;
  }
};
