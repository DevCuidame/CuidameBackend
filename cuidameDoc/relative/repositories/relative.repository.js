const pool = require("../../../utils/connection");
const Relative = require("../model/relative.models");

exports.createRelative = async (
  user_id,
  doctor_id,
  first_name,
  last_name,
  identification_type,
  identification_number,
  age,
  gender,
  marital_status,
  place_of_birth,
  city_id,
  address,
  phone,
  occupation,
  position,
  health_insurance_id,
  company_id,
  status
) => {
  const query = `
    INSERT INTO relatives (
      user_id,
      doctor_id,
      first_name,
      last_name,
      identification_type,
      identification_number,
      age,
      gender,
      marital_status,
      place_of_birth,
      city_id,
      address,
      phone,
      occupation,
      position,
      health_insurance_id,
      company_id,
      status
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) RETURNING *`;
  
  const values = [
    user_id,
    doctor_id,
    first_name,
    last_name,
    identification_type,
    identification_number,
    age,
    gender,
    marital_status,
    place_of_birth,
    city_id,
    address,
    phone,
    occupation,
    position,
    health_insurance_id,
    company_id,
    status
  ];

  const result = await pool.query(query, values);
  const { id } = result.rows[0];
  return new Relative(
    id,
    user_id,
    doctor_id,
    first_name,
    last_name,
    identification_type,
    identification_number,
    age,
    gender,
    marital_status,
    place_of_birth,
    city_id,
    address,
    phone,
    occupation,
    position,
    health_insurance_id,
    company_id,
    status
  );
};

exports.getRelative = async (id) => {
  const query = 'SELECT * FROM relatives WHERE id = $1';
  const result = await pool.query(query, [id]);
  const {
    user_id,
    doctor_id,
    first_name,
    last_name,
    identification_type,
    identification_number,
    age,
    gender,
    marital_status,
    place_of_birth,
    city_id,
    address,
    phone,
    occupation,
    position,
    health_insurance_id,
    company_id,
    status
  } = result.rows[0];

  return new Relative(
    id,
    user_id,
    doctor_id,
    first_name,
    last_name,
    identification_type,
    identification_number,
    age,
    gender,
    marital_status,
    place_of_birth,
    city_id,
    address,
    phone,
    occupation,
    position,
    health_insurance_id,
    company_id,
    status
  );
};

exports.getAllRelatives = async () => {
  const query = 'SELECT * FROM relatives';
  const result = await pool.query(query);

  return result.rows.map(row => {
    const {
      id,
      user_id,
      doctor_id,
      first_name,
      last_name,
      identification_type,
      identification_number,
      age,
      gender,
      marital_status,
      place_of_birth,
      city_id,
      address,
      phone,
      occupation,
      position,
      health_insurance_id,
      company_id,
      status
    } = row;

    return new Relative(
      id,
      user_id,
      doctor_id,
      first_name,
      last_name,
      identification_type,
      identification_number,
      age,
      gender,
      marital_status,
      place_of_birth,
      city_id,
      address,
      phone,
      occupation,
      position,
      health_insurance_id,
      company_id,
      status
    );
  });
};

exports.updateRelative = async (
  id,
  user_id,
  doctor_id,
  first_name,
  last_name,
  identification_type,
  identification_number,
  age,
  gender,
  marital_status,
  place_of_birth,
  city_id,
  address,
  phone,
  occupation,
  position,
  health_insurance_id,
  company_id,
  status
) => {
  const query = `
    UPDATE relatives SET 
      user_id = $1,
      doctor_id = $2,
      first_name = $3,
      last_name = $4,
      identification_type = $5,
      identification_number = $6,
      age = $7,
      gender = $8,
      marital_status = $9,
      place_of_birth = $10,
      city_id = $11,
      address = $12,
      phone = $13,
      occupation = $14,
      position = $15,
      health_insurance_id = $16,
      company_id = $17,
      status = $18
    WHERE id = $19
    RETURNING *`;
  
  const values = [
    user_id,
    doctor_id,
    first_name,
    last_name,
    identification_type,
    identification_number,
    age,
    gender,
    marital_status,
    place_of_birth,
    city_id,
    address,
    phone,
    occupation,
    position,
    health_insurance_id,
    company_id,
    status,
    id
  ];

  const result = await pool.query(query, values);
  return new Relative(
    id,
    user_id,
    doctor_id,
    first_name,
    last_name,
    identification_type,
    identification_number,
    age,
    gender,
    marital_status,
    place_of_birth,
    city_id,
    address,
    phone,
    occupation,
    position,
    health_insurance_id,
    company_id,
    status
  );
};

exports.deleteRelative = async (id) => {
  const query = 'DELETE FROM relatives WHERE id = $1';
  await pool.query(query, [id]);
};
