const pool = require("../../../utils/connection");
const EmergencyContact = require("../model/emergencyContact.model");

exports.createEmergencyContact = async (relative_id, first_name, last_name, phone) => {
  const query = 'INSERT INTO emergency_contacts (relative_id, first_name, last_name, phone) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [relative_id, first_name, last_name, phone];
  const result = await pool.query(query, values);
  const { id } = result.rows[0];
  return new EmergencyContact(id, relative_id, first_name, last_name, phone);
};

exports.getEmergencyContact = async (id) => {
  const query = 'SELECT * FROM emergency_contacts WHERE id = $1';
  const result = await pool.query(query, [id]);
  const { relative_id, first_name, last_name, phone } = result.rows[0];
  return new EmergencyContact(id, relative_id, first_name, last_name, phone);
};

exports.getAllEmergencyContacts = async () => {
  const query = 'SELECT * FROM emergency_contacts';
  const result = await pool.query(query);
  return result.rows.map(row => {
    const { id, relative_id, first_name, last_name, phone } = row;
    return new EmergencyContact(id, relative_id, first_name, last_name, phone);
  });
};

exports.updateEmergencyContact = async (id, relative_id, first_name, last_name, phone) => {
  const query = 'UPDATE emergency_contacts SET relative_id = $1, first_name = $2, last_name = $3, phone = $4 WHERE id = $5 RETURNING *';
  const values = [relative_id, first_name, last_name, phone, id];
  const result = await pool.query(query, values);
  return new EmergencyContact(id, relative_id, first_name, last_name, phone);
};

exports.deleteEmergencyContact = async (id) => {
  const query = 'DELETE FROM emergency_contacts WHERE id = $1';
  await pool.query(query, [id]);
};
