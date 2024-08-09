const ConditionModel = require("../../models/relative/condition.model");
const pool = require("../../../../utils/connection");


exports.createCondition = async (data) => {
  const { id_paciente, discapacidad, embarazada, cicatrices_descripcion, tatuajes_descripcion, created_at, updated_at } = data;
  const query = 'INSERT INTO condicion (id_paciente, discapacidad, embarazada, cicatrices_descripcion, tatuajes_descripcion, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
  const values = [id_paciente, discapacidad, embarazada, cicatrices_descripcion, tatuajes_descripcion, created_at, updated_at];
  const result = await pool.query(query, values);
  const { id } = result.rows[0];
  return new ConditionModel(id, id_paciente, discapacidad, embarazada, cicatrices_descripcion, tatuajes_descripcion, created_at, updated_at);
};

exports.getCondition = async (id) => {
  const query = 'SELECT * FROM condicion WHERE id = $1';
  const result = await pool.query(query, [id]);
  if (!result.rows.length) {
    return null;
  }
  const { id_paciente, discapacidad, embarazada, cicatrices_descripcion, tatuajes_descripcion, created_at, updated_at } = result.rows[0];
  return new ConditionModel(id, id_paciente, discapacidad, embarazada, cicatrices_descripcion, tatuajes_descripcion, created_at, updated_at);
};

exports.getConditionByRelative = async (id) => {
  const query = 'SELECT * FROM condicion WHERE id_paciente = $1';
  const result = await pool.query(query, [id]);
  if (!result.rows.length) {
    return null;
  }
  return result.rows.map(row => {
    const { id, id_paciente, discapacidad, embarazada, cicatrices_descripcion, tatuajes_descripcion, created_at, updated_at } = row;
    return new ConditionModel(id, id_paciente, discapacidad, embarazada, cicatrices_descripcion, tatuajes_descripcion, created_at, updated_at);
  });
};

exports.getAllConditions = async () => {
  const query = 'SELECT * FROM condicion';
  const result = await pool.query(query);
  if (!result.rows.length) {
    return null;  
  }
  return result.rows.map(row => {
    const { id, id_paciente, discapacidad, embarazada, cicatrices_descripcion, tatuajes_descripcion, created_at, updated_at } = row;
    return new ConditionModel(id, id_paciente, discapacidad, embarazada, cicatrices_descripcion, tatuajes_descripcion, created_at, updated_at);
  });
};

exports.updateCondition = async (id_paciente, data) => {
  const { discapacidad, embarazada, cicatrices_descripcion, tatuajes_descripcion, updated_at } = data;
  const query = 'UPDATE condicion SET discapacidad = $1, embarazada = $2, cicatrices_descripcion = $3, tatuajes_descripcion = $4, updated_at = $5 WHERE id_paciente = $6 RETURNING *';
  const values = [discapacidad, embarazada, cicatrices_descripcion, tatuajes_descripcion, updated_at, id_paciente];
  const result = await pool.query(query, values);
  return result.rows[0];
};


exports.deleteCondition = async (id) => {
  const selectQuery = 'SELECT * FROM condicion WHERE id = $1';
  const deleteQuery = 'DELETE FROM condicion WHERE id = $1';

  try {
    const selectResult = await pool.query(selectQuery, [id]);
    if (!selectResult.rows.length) {
      return false; 
    }

    await pool.query(deleteQuery, [id]);
    return true;  
  } catch (error) {
    console.error("Error al eliminar condición:", error);
    throw error;
  }
};
