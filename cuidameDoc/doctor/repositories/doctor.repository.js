const pool = require("../../../utils/connection");
const Doctor = require("../model/doctor.model");

exports.createDoctor = async (first_name, last_name, identification_type, identification_number, city_id, address, phone, medical_record, medical_specialist, landline_phone, note, rating) => {
  const query = 'INSERT INTO doctor (first_name, last_name, identification_type, identification_number, city_id, address, phone, medical_record, medical_specialist, landline_phone, note, rating) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *';
  const values = [first_name, last_name, identification_type, identification_number, city_id, address, phone, medical_record, medical_specialist, landline_phone, note, rating];
  const result = await pool.query(query, values);
  const { id } = result.rows[0];
  return new Doctor(id, first_name, last_name, identification_type, identification_number, city_id, address, phone, medical_record, medical_specialist, landline_phone, note, rating);
};

exports.getDoctor = async (id) => {
  const query = 'SELECT * FROM doctor WHERE id = $1';
  const result = await pool.query(query, [id]);
  if (!result.rows.length) {
    return null;
  }
  const { first_name, last_name, identification_type, identification_number, city_id, address, phone, medical_record, medical_specialist, landline_phone, note, rating } = result.rows[0];
  return new Doctor(id, first_name, last_name, identification_type, identification_number, city_id, address, phone, medical_record, medical_specialist, landline_phone, note, rating);
};


exports.getDoctorByCard = async (id) => {
  const query = 'SELECT * FROM doctor WHERE identification_number = $1';
  const result = await pool.query(query, [id]);
  if (!result.rows.length) {
    return null;  
  }
  const { first_name, last_name, identification_type, identification_number, city_id, address, phone, medical_record, medical_specialist, landline_phone, note, rating } = result.rows[0];
  return new Doctor(id, first_name, last_name, identification_type, identification_number, city_id, address, phone, medical_record, medical_specialist, landline_phone, note, rating);
};

exports.getAllDoctors = async () => {
  const query = 'SELECT * FROM doctor';
  const result = await pool.query(query);
  if (!result.rows.length) {
    return null;  
  }
  return result.rows.map(row => {
    const { id, first_name, last_name, identification_type, identification_number, city_id, address, phone, medical_record, medical_specialist, landline_phone, note, rating } = row;
    return new Doctor(id, first_name, last_name, identification_type, identification_number, city_id, address, phone, medical_record, medical_specialist, landline_phone, note, rating);
  });
};

exports.updateDoctor = async (id, first_name, last_name, identification_type, identification_number, city_id, address, phone, medical_record, medical_specialist, landline_phone, note, rating) => {
  const query = 'UPDATE doctor SET first_name = $1, last_name = $2, identification_type = $3, identification_number = $4, city_id = $5, address = $6, phone = $7, medical_record = $8, medical_specialist = $9, landline_phone = $10, note = $11, rating = $12 WHERE id = $13 RETURNING *';
  const values = [first_name, last_name, identification_type, identification_number, city_id, address, phone, medical_record, medical_specialist, landline_phone, note, rating, id];
  const result = await pool.query(query, values);
  return new Doctor(id, first_name, last_name, identification_type, identification_number, city_id, address, phone, medical_record, medical_specialist, landline_phone, note, rating);
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
