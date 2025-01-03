const pool = require("../../../../utils/connection");
const Order = require("../../models/relative/order.model");

// Crear una nueva orden
exports.createOrder = async (orderData) => {

  orderData.date_order = orderData.date_order || null;
  orderData.date_auth = orderData.date_auth || null;
  orderData.delivery_date = orderData.delivery_date || null;

  const query = `
  INSERT INTO controlmedicines (
    medicament_name, date_order, duration, dose, frequency, quantity, authorized, 
    mipres, controlled_substances, eps_authorization, pharmacy, date_auth, 
    phone, address, description, delivery_status, delivery_date, comments, id_patient
  ) VALUES (
    $1, $2, $3, $4, $5, $6, 
    $7, $8, $9, $10, $11, $12, 
    $13, $14, $15, $16, $17, $18, $19
  ) RETURNING id`;

  const values = [
    orderData.medicament_name,
    orderData.date_order,
    orderData.duration,
    orderData.dose,
    orderData.frequency,
    orderData.quantity,
    orderData.authorized,
    orderData.mipres,
    orderData.controlled_substances,
    orderData.eps_authorization,
    orderData.pharmacy,
    orderData.date_auth,
    orderData.phone,
    orderData.address,
    orderData.description,
    orderData.delivery_status,
    orderData.delivery_date,
    orderData.comments,
    orderData.id_patient
  ];

  const result = await pool.query(query, values);
  const order = result.rows[0];
  return new Order(order.id);
};

// Obtener una orden por ID
exports.getOrderById = async (id) => {
  const query = 'SELECT * FROM controlmedicines WHERE id = $1';
  const result = await pool.query(query, [id]);
  if (!result.rows.length) return null;

  const order = result.rows[0];
  return new Order(
    order.id,
    order.medicament_name,
    order.date_order,
    order.duration,
    order.dose,
    order.frequency,
    order.quantity,
    order.authorized,
    order.mipres,
    order.controlled_substances,
    order.eps_authorization,
    order.pharmacy,
    order.date_auth,
    order.phone,
    order.address,
    order.description,
    order.delivery_status,
    order.delivery_date,
    order.comments,
    orderData.idPatient
  );
};

// Obtener una orden por ID del paciente
exports.getOrderByIdPatient = async (id) => {
  const query = 'SELECT * FROM controlmedicines WHERE id = $1';
  const result = await pool.query(query, [id]);
  if (!result.rows.length) return null;

  const order = result.rows[0];
  return new Order(
    order.id,
    order.medicament_name,
    order.date_order,
    order.duration,
    order.dose,
    order.frequency,
    order.quantity,
    order.authorized,
    order.mipres,
    order.controlled_substances,
    order.eps_authorization,
    order.pharmacy,
    order.date_auth,
    order.phone,
    order.address,
    order.description,
    order.delivery_status,
    order.delivery_date,
    order.comments,
    orderData.idPatient
  );
};

// Obtener todas las órdenes
exports.getAllOrders = async () => {
  const query = 'SELECT * FROM controlmedicines';
  const result = await pool.query(query);
  console.log(result.rows);
  if (!result.rows.length) return null;

  return result.rows.map(order => new Order(
    order.id,
    order.medicament_name,
    order.date_order,
    order.duration,
    order.dose,
    order.frequency,
    order.quantity,
    order.authorized,
    order.mipres,
    order.controlled_substances,
    order.eps_authorization,
    order.pharmacy,
    order.date_auth,
    order.phone,
    order.address,
    order.description,
    order.delivery_status,
    order.delivery_date,
    order.comments,
    orderData.idPatient
  ));
};

// Actualizar una orden
exports.updateOrder = async (id, orderData) => {
  const columns = Object.keys(orderData)
    .map((key, index) => `${key} = $${index + 2}`) // Generar dinámicamente las columnas
    .join(", ");

  const values = Object.values(orderData);
  const query = `
    UPDATE controlmedicines
    SET ${columns}
    WHERE id = $1
    RETURNING *;
  `;

  const result = await pool.query(query, [id, ...values]);
  return result.rows[0];
};


// Eliminar una orden
exports.deleteOrder = async (id) => {
  const query = 'DELETE FROM controlmedicines WHERE id = $1';
  await pool.query(query, [id]);
};
