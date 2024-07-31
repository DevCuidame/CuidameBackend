const pool = require("../../../../utils/connection");
const RelativeModel = require("../../models/relative/relative.model");

exports.createRelative = async (data) => {
  const {   code, nombre, apellido, tipoid, numeroid, telefono, fecha_nacimiento, genero, ciudad,
    departamento, direccion, rh, eps, prepagada, arl, seguro_funerario, a_cargo_id,
    image, enterprise, nit, created_at, updated_at, photourl, pub_name, file_bs64 } = data
  const query = `
    INSERT INTO pacientes (code, nombre, apellido, tipoid, numeroid, telefono, fecha_nacimiento, genero, ciudad,
    departamento, direccion, rh, eps, prepagada, arl, seguro_funerario, a_cargo_id,
    image, enterprise, nit, created_at, updated_at, photourl, pub_name, file_bs64)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25)
    RETURNING *
  `;
  const values = [
    code, nombre, apellido, tipoid, numeroid, telefono, fecha_nacimiento, genero, ciudad,
    departamento, direccion, rh, eps, prepagada, arl, seguro_funerario, a_cargo_id,
    image, enterprise, nit, created_at, updated_at, photourl, pub_name, file_bs64
  ];
  const result = await pool.query(query, values);
  const { id } = result.rows[0];
  return new RelativeModel(
    id, code, nombre, apellido, tipoid, numeroid, telefono, fecha_nacimiento, genero, ciudad,
    departamento, direccion, rh, eps, prepagada, arl, seguro_funerario, a_cargo_id,
    image, enterprise, nit, created_at, updated_at, photourl, pub_name, file_bs64
  );
};

exports.getRelative = async (id) => {
  const query = 'SELECT * FROM pacientes WHERE id = $1';
  const result = await pool.query(query, [id]);
  if (!result.rows.length) {
    return null;
  }
  const {
    code, nombre, apellido, tipoid, numeroid, telefono, fecha_nacimiento, genero, ciudad,
    departamento, direccion, rh, eps, prepagada, arl, seguro_funerario, a_cargo_id,
    image, enterprise, nit, created_at, updated_at, photourl, pub_name, file_bs64
  } = result.rows[0];
  return new RelativeModel(
    id, code, nombre, apellido, tipoid, numeroid, telefono, fecha_nacimiento, genero, ciudad,
    departamento, direccion, rh, eps, prepagada, arl, seguro_funerario, a_cargo_id,
    image, enterprise, nit, created_at, updated_at, photourl, pub_name, file_bs64
  );
};

exports.getAllRelatives = async () => {
  const query = 'SELECT * FROM pacientes';
  const result = await pool.query(query);
  if (!result.rows.length) {
    return null;
  }
  return result.rows.map(row => {
    const {
      id, code, nombre, apellido, tipoid, numeroid, telefono, fecha_nacimiento, genero, ciudad,
      departamento, direccion, rh, eps, prepagada, arl, seguro_funerario, a_cargo_id,
      image, enterprise, nit, created_at, updated_at, photourl, pub_name, file_bs64
    } = row;
    return new RelativeModel(
      id, code, nombre, apellido, tipoid, numeroid, telefono, fecha_nacimiento, genero, ciudad,
      departamento, direccion, rh, eps, prepagada, arl, seguro_funerario, a_cargo_id,
      image, enterprise, nit, created_at, updated_at, photourl, pub_name, file_bs64
    );
  });
};

exports.updateRelative = async (id, data) => {
  const { code, nombre, apellido, tipoid, numeroid, telefono, fecha_nacimiento, genero, ciudad,
    departamento, direccion, rh, eps, prepagada, arl, seguro_funerario, a_cargo_id,
    image, enterprise, nit, created_at, updated_at, photourl, pub_name, file_bs64 } = data
  const query = `
    UPDATE pacientes SET code = $1, nombre = $2, apellido = $3, tipoid = $4, numeroid = $5, telefono = $6, fecha_nacimiento = $7, genero = $8, ciudad = $9,
    departamento = $10, direccion = $11, rh = $12, eps = $13, prepagada = $14, arl = $15, seguro_funerario = $16, a_cargo_id = $17,
    image = $18, enterprise = $19, nit = $20, created_at = $21, updated_at = $22, photourl = $23, pub_name = $24, file_bs64 = $25
    WHERE id = $26 RETURNING *
  `;
  const values = [
    code, nombre, apellido, tipoid, numeroid, telefono, fecha_nacimiento, genero, ciudad,
    departamento, direccion, rh, eps, prepagada, arl, seguro_funerario, a_cargo_id,
    image, enterprise, nit, created_at, updated_at, photourl, pub_name, file_bs64, id
  ];
  const result = await pool.query(query, values);
  return new RelativeModel(
    id, code, nombre, apellido, tipoid, numeroid, telefono, fecha_nacimiento, genero, ciudad,
    departamento, direccion, rh, eps, prepagada, arl, seguro_funerario, a_cargo_id,
    image, enterprise, nit, created_at, updated_at, photourl, pub_name, file_bs64
  );
};

exports.deleteRelative = async (id) => {
  const selectQuery = 'SELECT * FROM pacientes WHERE id = $1';
  const deleteQuery = 'DELETE FROM pacientes WHERE id = $1';

  try {
    const selectResult = await pool.query(selectQuery, [id]);
    if (!selectResult.rows.length) {
      return false; 
    }

    await pool.query(deleteQuery, [id]);
    return true;  
  } catch (error) {
    console.error("Error al eliminar paciente:", error);
    throw error;
  }
};
