const pool = require("../../../utils/connection");
const ContractServices = require("../models/ContractServices");

exports.createContractService = async (contract_id, name, type, price) => {
  const query = 'INSERT INTO contract_services (contract_id, name, type, price) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [contract_id, name, type, price];
  const result = await pool.query(query, values);
  const { id } = result.rows[0];
  return new ContractServices(id, contract_id, name, type, price);
};

exports.getContractService = async (id) => {
  const query = 'SELECT * FROM contract_services WHERE id = $1';
  const result = await pool.query(query, [id]);
  const { contract_id, name, type, price } = result.rows[0];
  return new ContractServices(id, contract_id, name, type, price);
};

exports.getAllContractServices = async () => {
  const query = 'SELECT * FROM contract_services';
  const result = await pool.query(query);
  return result.rows.map(row => {
    const { id, contract_id, name, type, price } = row;
    return new ContractServices(id, contract_id, name, type, price);
  });
};

exports.updateContractService = async (id, contract_id, name, type, price) => {
  const query = 'UPDATE contract_services SET contract_id = $1, name = $2, type = $3, price = $4 WHERE id = $5 RETURNING *';
  const values = [contract_id, name, type, price, id];
  const result = await pool.query(query, values);
  return new ContractServices(id, contract_id, name, type, price);
};

exports.deleteContractService = async (id) => {
  const query = 'DELETE FROM contract_services WHERE id = $1';
  await pool.query(query, [id]);
};
