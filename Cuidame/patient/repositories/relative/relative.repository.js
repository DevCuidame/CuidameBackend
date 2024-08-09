const pool = require("../../../../utils/connection");
const RelativeModel = require("../../models/relative/relative.model");

exports.createRelative = async (data) => {
  const {   code, nombre, apellido, tipoid, numeroid, telefono, fecha_nacimiento, genero, ciudad,
    departamento, direccion, rh, eps, prepagada, arl, seguro_funerario, a_cargo_id,
    image, enterprise, nit, created_at, updated_at, photourl, imagebs64 } = data
  const query = `
    INSERT INTO pacientes (code, nombre, apellido, tipoid, numeroid, telefono, fecha_nacimiento, genero, ciudad,
    departamento, direccion, rh, eps, prepagada, arl, seguro_funerario, a_cargo_id,
    image, enterprise, nit, created_at, updated_at, photourl, imagebs64)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24)
    RETURNING *
  `;
  const values = [
    code, nombre, apellido, tipoid, numeroid, telefono, fecha_nacimiento, genero, ciudad,
    departamento, direccion, rh, eps, prepagada, arl, seguro_funerario, a_cargo_id,
    image, enterprise, nit, created_at, updated_at, photourl, imagebs64
  ];
  const result = await pool.query(query, values);
  const { id } = result.rows[0];
  return new RelativeModel(
    id, code, nombre, apellido, tipoid, numeroid, telefono, fecha_nacimiento, genero, ciudad,
    departamento, direccion, rh, eps, prepagada, arl, seguro_funerario, a_cargo_id,
    image, enterprise, nit, created_at, updated_at, photourl, imagebs64
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
    created_at, updated_at, photourl, imagebs64
  } = result.rows[0];

  // Ajusta los parámetros de acuerdo con el modelo RelativeModel
  return new RelativeModel(
    id, code, nombre, apellido, tipoid, numeroid, telefono, fecha_nacimiento, genero, ciudad,
    departamento, direccion, rh, eps, prepagada, arl, seguro_funerario, a_cargo_id,
    created_at, updated_at, photourl, imagebs64
  );
};
exports.getRelativeByNit = async (numeroid) => {
  const query = 'SELECT * FROM pacientes WHERE numeroid = $1';
  const result = await pool.query(query, [numeroid]);
  if (!result.rows.length) {
    return null;
  }
  const {
    code, nombre, apellido, tipoid, numeroid: dbNumeroid, telefono, fecha_nacimiento, genero, ciudad,
    departamento, direccion, rh, eps, prepagada, arl, seguro_funerario, a_cargo_id,
    image, enterprise, nit, created_at, updated_at, photourl, imagebs64
  } = result.rows[0];
  return new RelativeModel(
    dbNumeroid, code, nombre, apellido, tipoid, numeroid, telefono, fecha_nacimiento, genero, ciudad,
    departamento, direccion, rh, eps, prepagada, arl, seguro_funerario, a_cargo_id,
    image, enterprise, nit, created_at, updated_at, photourl, imagebs64
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
      image, enterprise, nit, created_at, updated_at, photourl,  imagebs64
    } = row;
    return new RelativeModel(
      id, code, nombre, apellido, tipoid, numeroid, telefono, fecha_nacimiento, genero, ciudad,
      departamento, direccion, rh, eps, prepagada, arl, seguro_funerario, a_cargo_id,
      image, enterprise, nit, created_at, updated_at, photourl,  imagebs64
    );
  });
};

exports.updateRelative = async (id, data) => {
  const { nombre, apellido, tipoid, numeroid, telefono, fecha_nacimiento, genero, ciudad,
    departamento, direccion, rh, eps, prepagada, arl, seguro_funerario, created_at, updated_at, photourl, imagebs64 } = data;
    
  const query = `
    UPDATE pacientes SET 
      nombre = $1, 
      apellido = $2, 
      tipoid = $3, 
      numeroid = $4, 
      telefono = $5, 
      fecha_nacimiento = $6, 
      genero = $7, 
      ciudad = $8,
      departamento = $9, 
      direccion = $10, 
      rh = $11, 
      eps = $12, 
      prepagada = $13, 
      arl = $14, 
      seguro_funerario = $15, 
      photourl = $16, 
      imagebs64 = $17, 
      updated_at = $18
    WHERE id = $19 RETURNING *
  `;

  const values = [
    nombre, apellido, tipoid, numeroid, telefono, fecha_nacimiento, genero, ciudad,
    departamento, direccion, rh, eps, prepagada, arl, seguro_funerario, photourl, imagebs64, updated_at, id
  ];

  const result = await pool.query(query, values);

  return new RelativeModel(
    id, nombre, apellido, tipoid, numeroid, telefono, fecha_nacimiento, genero, ciudad,
    departamento, direccion, rh, eps, prepagada, arl, seguro_funerario, created_at, updated_at, photourl, imagebs64
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
