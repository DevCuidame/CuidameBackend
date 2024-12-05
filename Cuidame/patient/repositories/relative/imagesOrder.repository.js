const pool = require("../../../../utils/connection");
const ImagesOrder = require("../../models/relative/imagesOrder.model");

exports.saveImage = async ({ name, id_order, category, path }) => {
  console.log(name, id_order, path);
  const query = `
    INSERT INTO imagesmedicine (name, path, category, id_order)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [name, path, category, id_order];

  const result = await pool.query(query, values);
  const image = result.rows[0];
  return new ImagesOrder(image.id, image.name, image.path, image.category, image.created_at);
};

exports.getImageById = async (id) => {
  const query = 'SELECT * FROM imagesmedicine WHERE id = $1';
  const result = await pool.query(query, [id]);
  if (!result.rows.length) return null;

  const image = result.rows[0];
  return new ImagesOrder(image.id, image.name, image.path, image.category, image.created_at);
};
