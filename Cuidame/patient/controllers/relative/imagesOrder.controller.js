const imageService = require('../../services/relative/imagesOrder.service');

exports.uploadImage = async (req, res) => {
  try {
    const imageData = req.body;
    const savedImage = await imageService.saveImage(imageData);

    // Respondemos con la información de la imagen guardada
    res.status(200).json({
      message: 'Imagen guardada correctamente',
      data: savedImage,
    });
  } catch (error) {
    console.error('Error al subir la imagen:', error.message);
    res.status(500).json({
      error: `Error al guardar la imagen: ${error.message}`,
    });
  }
};

exports.getImageById = async (req, res) => {
  try {
    const { id } = req.params;

    const image = await imageService.getImageById(id);

    res.status(200).json({
      success: true,
      data: image,
    });
  } catch (error) {
    console.error("Error al obtener la imagen como Base64:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};