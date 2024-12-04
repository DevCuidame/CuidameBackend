const pool = require("../../../utils/connection");
const ImagesOrder = require("../models/imagesOrder.model");

exports.saveImageRecord = async ({ name, id_order, path }) => {
  const query = `
    INSERT INTO images (name, path, id_order)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [name, id_order, path];

  const result = await pool.query(query, values);
  const image = result.rows[0];
  return new ImagesOrder(image.id, image.name, image.path, image.created_at);
};

exports.getAllImages = async () => {
  const query = `SELECT * FROM images;`;
  const result = await pool.query(query);
  return result.rows.map(
    (image) => new ImagesOrder(image.id, image.name, image.path, image.created_at)
  );
};
