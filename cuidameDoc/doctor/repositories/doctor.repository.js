const pool = require("../../../utils/connection");
const Doctor = require("../model/doctor.model");

exports.createDoctor = async (first_name, last_name, identification_type, identification_number, city_id, address, phone, medical_record, medical_specialist, landline_phone, note, rating, pub_name, priv_name, file_bs64) => {
  const query = 'INSERT INTO doctor (first_name, last_name, identification_type, identification_number, city_id, address, phone, medical_record, medical_specialist, landline_phone, note, rating, pub_name, priv_name, file_bs64) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *';
  const values = [first_name, last_name, identification_type, identification_number, city_id, address, phone, medical_record, medical_specialist, landline_phone, note, rating, pub_name, priv_name, file_bs64];
  const result = await pool.query(query, values);
  const { id } = result.rows[0];
  return new Doctor(id, first_name, last_name, identification_type, identification_number, city_id, address, phone, medical_record, medical_specialist, landline_phone, note, rating, pub_name, priv_name, file_bs64);
};

exports.getDoctor = async (id) => {
  const query = 'SELECT * FROM doctor WHERE id = $1';
  const result = await pool.query(query, [id]);
  if (!result.rows.length) {
    return null;
  }
  const { first_name, last_name, identification_type, identification_number, city_id, address, phone, medical_record, medical_specialist, landline_phone, note, rating, pub_name, priv_name, file_bs64 } = result.rows[0];
  return new Doctor(id, first_name, last_name, identification_type, identification_number, city_id, address, phone, medical_record, medical_specialist, landline_phone, note, rating, pub_name, priv_name, file_bs64);
};


exports.getDoctorByCard = async (id) => {
  const query = 'SELECT * FROM doctor WHERE identification_number = $1';
  const result = await pool.query(query, [id]);
  if (!result.rows.length) {
    return null;  
  }
  const { first_name, last_name, identification_type, identification_number, city_id, address, phone, medical_record, medical_specialist, landline_phone, note, rating, pub_name, priv_name, file_bs64 } = result.rows[0];
  return new Doctor(id, first_name, last_name, identification_type, identification_number, city_id, address, phone, medical_record, medical_specialist, landline_phone, note, rating, pub_name, priv_name, file_bs64);
};

exports.getAllDoctors = async () => {
  const query = 'SELECT * FROM doctor';
  const result = await pool.query(query);
  if (!result.rows.length) {
    return null;  
  }
  return result.rows.map(row => {
    const { id, first_name, last_name, identification_type, identification_number, city_id, address, phone, medical_record, medical_specialist, landline_phone, note, rating, pub_name, priv_name, file_bs64 } = row;
    return new Doctor(id, first_name, last_name, identification_type, identification_number, city_id, address, phone, medical_record, medical_specialist, landline_phone, note, rating, pub_name, priv_name, file_bs64);
  });
};

exports.updateDoctor = async (id, first_name, last_name, identification_type, identification_number, city_id, address, phone, medical_record, medical_specialist, landline_phone, note, rating, pub_name, priv_name, file_bs64) => {
  const query = 'UPDATE doctor SET first_name = $1, last_name = $2, identification_type = $3, identification_number = $4, city_id = $5, address = $6, phone = $7, medical_record = $8, medical_specialist = $9, landline_phone = $10, note = $11, rating = $12, pub_name = $13, priv_name = $14, file_bs64 = $15 WHERE id = $13 RETURNING *';
  const values = [first_name, last_name, identification_type, identification_number, city_id, address, phone, medical_record, medical_specialist, landline_phone, note, rating, pub_name, priv_name, file_bs64, id];
  const result = await pool.query(query, values);
  return new Doctor(id, first_name, last_name, identification_type, identification_number, city_id, address, phone, medical_record, medical_specialist, landline_phone, note, rating, pub_name, priv_name, file_bs64);
};

exports.deleteDoctor = async (id) => {
  const selectQuery = 'SELECT * FROM doctor WHERE id = $1';
  const deleteQuery = 'DELETE FROM doctor WHERE id = $1';

  try {
    const selectResult = await pool.query(selectQuery, [id]);
    if (!selectResult.rows.length) {
      return false; 
    }

    await pool.query(deleteQuery, [id]);
    return true;  
  } catch (error) {
    console.error("Error al eliminar doctor:", error);
    throw error;
  }
}
