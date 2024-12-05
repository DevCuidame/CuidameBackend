const fs = require("fs");
const path = require("path");
const { buildImage } = require("../../../../utils/image.handler");
const { buildPdf } = require("../../../../utils/pdfHandler");
const imageRepository = require("../../repositories/relative/imagesOrder.repository");

exports.saveImage = async (imageData) => {
  try {
    const { id, fileName, type, category, base64 } = imageData;

    if (!id || !base64) {
      throw new Error("Faltan datos en el payload (id, imagen son requeridos).");
    }

    let filePath;

    if (type === 'application/pdf') {
      filePath = await buildPdf(fileName, 'MedicineControl', base64);
    } else if (type.startsWith('image/')) {
      filePath = await buildImage(fileName, 'MedicineControl', base64);
    } else {
      throw new Error(`Tipo de archivo no soportado: ${type}`);
    }

    filePath = `/home/developer/uploads/MedicineControl/${filePath}`;

    // Guarda el registro en la base de datos
    const savedImage = await imageRepository.saveImage({
      name: fileName,
      id_order: id,
      category: category,
      path: filePath,
    });

    return savedImage;
  } catch (error) {
    throw new Error("Error al guardar el archivo: " + error.message);
  }
};

exports.getImageById = async (id) => {
  try {
    const image = await imageRepository.getImageById(id);

    if (!image) {
      throw new Error("Imagen no encontrada.");
    }

    const imagePath = path.resolve(image.path);

    if (!fs.existsSync(imagePath)) {
      throw new Error("El archivo de la imagen no existe en el sistema.");
    }

    const imageBuffer = fs.readFileSync(imagePath);
    const imageResult = imageBuffer.toString("base64");

    return {
      name: image.name,
      base64: imageResult,
    };
  } catch (error) {
    throw new Error("Error al obtener la imagen como Base64: " + error.message);
  }
};
