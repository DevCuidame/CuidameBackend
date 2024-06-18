const pool = require("../../../utils/connection");
const ContractServices = require("../model/contractServices.model");

exports.createContractService = async (contract_id, name, type, price) => {
  const query = 'INSERT INTO contractservices (contract_id, name, type, price) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [contract_id, name, type, price];
  const result = await pool.query(query, values);
  const { id } = result.rows[0];
  return new ContractServices(id, contract_id, name, type, price);
};

exports.getContractService = async (id) => {
  const query = 'SELECT * FROM contractservices WHERE id = $1';
  const result = await pool.query(query, [id]);
  if (!result.rows.length) {
    return null;  
  }
  const { contract_id, name, type, price } = result.rows[0];
  return new ContractServices(id, contract_id, name, type, price);
};

exports.getAllContractServices = async () => {
  const query = 'SELECT * FROM contractservices';
  const result = await pool.query(query);
  if (!result.rows.length) {
    return null;  
  }
  return result.rows.map(row => {
    const { id, contract_id, name, type, price } = row;
    return new ContractServices(id, contract_id, name, type, price);
  });
};

exports.updateContractService = async (id, contract_id, name, type, price) => {
  const query = 'UPDATE contractservices SET contract_id = $1, name = $2, type = $3, price = $4 WHERE id = $5 RETURNING *';
  const values = [contract_id, name, type, price, id];
  const result = await pool.query(query, values);
  return new ContractServices(id, contract_id, name, type, price);
};

exports.deleteContractService = async (id) => {
  const query = 'DELETE FROM contractservices WHERE id = $1';
  await pool.query(query, [id]);
};
