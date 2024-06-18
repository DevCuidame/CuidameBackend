const pool = require("../../../utils/connection");
const GynecoObstetrics = require("../model/gynecoObstetrics.model");

exports.createGynecoObstetrics = async (medical_consult_id, births, abortions, cesarean, gestations, menstrual_cycles, family_planning) => {
  const query = 'INSERT INTO gyneco_obstetrics (medical_consult_id, births, abortions, cesarean, gestations, menstrual_cycles, family_planning) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
  const values = [medical_consult_id, births, abortions, cesarean, gestations, menstrual_cycles, family_planning];
  const result = await pool.query(query, values);
  const { id } = result.rows[0];
  return new GynecoObstetrics(id, medical_consult_id, births, abortions, cesarean, gestations, menstrual_cycles, family_planning);
};

exports.getGynecoObstetrics = async (id) => {
  const query = 'SELECT * FROM gyneco_obstetrics WHERE id = $1';
  const result = await pool.query(query, [id]);
  const { medical_consult_id, births, abortions, cesarean, gestations, menstrual_cycles, family_planning } = result.rows[0];
  return new GynecoObstetrics(id, medical_consult_id, births, abortions, cesarean, gestations, menstrual_cycles, family_planning);
};

exports.getAllGynecoObstetrics = async () => {
  const query = 'SELECT * FROM gyneco_obstetrics';
  const result = await pool.query(query);
  return result.rows.map(row => {
    const { id, medical_consult_id, births, abortions, cesarean, gestations, menstrual_cycles, family_planning } = row;
    return new GynecoObstetrics(id, medical_consult_id, births, abortions, cesarean, gestations, menstrual_cycles, family_planning);
  });
};

exports.updateGynecoObstetrics = async (id, medical_consult_id, births, abortions, cesarean, gestations, menstrual_cycles, family_planning) => {
  const query = 'UPDATE gyneco_obstetrics SET medical_consult_id = $1, births = $2, abortions = $3, cesarean = $4, gestations = $5, menstrual_cycles = $6, family_planning = $7 WHERE id = $8 RETURNING *';
  const values = [medical_consult_id, births, abortions, cesarean, gestations, menstrual_cycles, family_planning, id];
  const result = await pool.query(query, values);
  return new GynecoObstetrics(id, medical_consult_id, births, abortions, cesarean, gestations, menstrual_cycles, family_planning);
};

exports.deleteGynecoObstetrics = async (id) => {
  const query = 'DELETE FROM gyneco_obstetrics WHERE id = $1';
  await pool.query(query, [id]);
};
