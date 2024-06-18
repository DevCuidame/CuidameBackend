const pool = require("../../../utils/connection");
const DoctorService = require("../model/doctorService.model");

exports.createDoctorService = async (name, visit_price, doctor_id, discount) => {
  const query = 'INSERT INTO doctorService (name, visit_price, doctor_id, discount) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [name, visit_price, doctor_id, discount];
  const result = await pool.query(query, values);
  const { id } = result.rows[0];
  return new DoctorService(id, name, visit_price, doctor_id, discount);
};

exports.getDoctorService = async (id) => {
  const query = 'SELECT * FROM doctorService WHERE id = $1';
  const result = await pool.query(query, [id]);
  if (!result.rows.length) {
    return null;  
  }
  const { name, visit_price, doctor_id, discount } = result.rows[0];
  return new DoctorService(id, name, visit_price, doctor_id, discount);
};

exports.getDoctorServiceByName = async (id) => {
  const query = 'SELECT * FROM doctorService WHERE name = $1';
  const result = await pool.query(query, [id]);
  if (!result.rows.length) {
    return null;  
  }
  const { name, visit_price, doctor_id, discount } = result.rows[0];
  return new DoctorService(id, name, visit_price, doctor_id, discount);
};

exports.getAllDoctorServices = async () => {
  const query = 'SELECT * FROM doctorService';
  const result = await pool.query(query);
  
  if (!result.rows.length) {
    return null;  
  }
  return result.rows.map(row => {
    const { id, name, visit_price, doctor_id, discount } = row;
    return new DoctorService(id, name, visit_price, doctor_id, discount);
  });
};

exports.updateDoctorService = async (id, name, visit_price, doctor_id, discount) => {
  const query = 'UPDATE doctorService SET name = $1, visit_price = $2, doctor_id = $3, discount = $4 WHERE id = $5 RETURNING *';
  const values = [name, visit_price, doctor_id, discount, id];
  const result = await pool.query(query, values);
  return new DoctorService(id, name, visit_price, doctor_id, discount);
};

exports.deleteDoctorService = async (id) => {
  const query = 'DELETE FROM doctorService WHERE id = $1';
  await pool.query(query, [id]);
};
