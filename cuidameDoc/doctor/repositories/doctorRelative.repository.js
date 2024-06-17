const pool = require("../../../utils/connection");
const DoctorRelative = require("../models/DoctorRelative");

exports.createDoctorRelative = async (doctor_id, relative_id, service_id) => {
  const query = 'INSERT INTO doctor_relatives (doctor_id, relative_id, service_id) VALUES ($1, $2, $3) RETURNING *';
  const values = [doctor_id, relative_id, service_id];
  const result = await pool.query(query, values);
  const { id } = result.rows[0];
  return new DoctorRelative(id, doctor_id, relative_id, service_id);
};

exports.getDoctorRelative = async (id) => {
  const query = 'SELECT * FROM doctor_relatives WHERE id = $1';
  const result = await pool.query(query, [id]);
  const { doctor_id, relative_id, service_id } = result.rows[0];
  return new DoctorRelative(id, doctor_id, relative_id, service_id);
};

exports.getAllDoctorRelatives = async () => {
  const query = 'SELECT * FROM doctor_relatives';
  const result = await pool.query(query);
  return result.rows.map(row => {
    const { id, doctor_id, relative_id, service_id } = row;
    return new DoctorRelative(id, doctor_id, relative_id, service_id);
  });
};

exports.updateDoctorRelative = async (id, doctor_id, relative_id, service_id) => {
  const query = 'UPDATE doctor_relatives SET doctor_id = $1, relative_id = $2, service_id = $3 WHERE id = $4 RETURNING *';
  const values = [doctor_id, relative_id, service_id, id];
  const result = await pool.query(query, values);
  return new DoctorRelative(id, doctor_id, relative_id, service_id);
};

exports.deleteDoctorRelative = async (id) => {
  const query = 'DELETE FROM doctor_relatives WHERE id = $1';
  await pool.query(query, [id]);
};
