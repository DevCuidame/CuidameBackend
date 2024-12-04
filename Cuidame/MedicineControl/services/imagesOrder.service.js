const { buildImage } = require("../../../utils/image.handler");
const imageRepository = require("../repositories/imagesOrder.repository");

exports.saveImage = async (imageData) => {
  try {
    const { id, name, base64 } = imageData;

    if (!id || !name || !base64) {
      throw new Error("Faltan datos en el payload (id, name, base64 son requeridos).");
    }

    name = name + '_' + id;

    // Guarda la imagen físicamente en el sistema de archivos
    const filePath = await buildImage(name, 'MedicineControl', base64);

    // Guarda el registro en la base de datos
    const savedImage = await imageRepository.saveImageRecord({
      name,
      id,
      path: filePath,
    });

    return savedImage;
  } catch (error) {
    throw new Error("Error al guardar la imagen: " + error.message);
  }
};

exports.getAllImages = async () => {
  try {
    return await imageRepository.getAllImages();
  } catch (error) {
    throw new Error("Error al obtener las imágenes: " + error.message);
  }
};
