const pool = require("../../../utils/connection");
const FamiliarRecords = require("../model/familarRecords.model");

exports.createFamiliarRecord = async (medical_consult_id, relative, diagnostic, records, hemorrhagic, thrombotic, oncological) => {
  const query = 'INSERT INTO familiar_records (medical_consult_id, relative, diagnostic, records, hemorrhagic, thrombotic, oncological) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
  const values = [medical_consult_id, relative, diagnostic, records, hemorrhagic, thrombotic, oncological];
  const result = await pool.query(query, values);
  const { id } = result.rows[0];
  return new FamiliarRecords(id, medical_consult_id, relative, diagnostic, records, hemorrhagic, thrombotic, oncological);
};

exports.getFamiliarRecord = async (id) => {
  const query = 'SELECT * FROM familiar_records WHERE id = $1';
  const result = await pool.query(query, [id]);
  const { medical_consult_id, relative, diagnostic, records, hemorrhagic, thrombotic, oncological } = result.rows[0];
  return new FamiliarRecords(id, medical_consult_id, relative, diagnostic, records, hemorrhagic, thrombotic, oncological);
};

exports.getAllFamiliarRecords = async () => {
  const query = 'SELECT * FROM familiar_records';
  const result = await pool.query(query);
  return result.rows.map(row => {
    const { id, medical_consult_id, relative, diagnostic, records, hemorrhagic, thrombotic, oncological } = row;
    return new FamiliarRecords(id, medical_consult_id, relative, diagnostic, records, hemorrhagic, thrombotic, oncological);
  });
};

exports.updateFamiliarRecord = async (id, medical_consult_id, relative, diagnostic, records, hemorrhagic, thrombotic, oncological) => {
  const query = 'UPDATE familiar_records SET medical_consult_id = $1, relative = $2, diagnostic = $3, records = $4, hemorrhagic = $5, thrombotic = $6, oncological = $7 WHERE id = $8 RETURNING *';
  const values = [medical_consult_id, relative, diagnostic, records, hemorrhagic, thrombotic, oncological, id];
  const result = await pool.query(query, values);
  return new FamiliarRecords(id, medical_consult_id, relative, diagnostic, records, hemorrhagic, thrombotic, oncological);
};

exports.deleteFamiliarRecord = async (id) => {
  const query = 'DELETE FROM familiar_records WHERE id = $1';
  await pool.query(query, [id]);
};
