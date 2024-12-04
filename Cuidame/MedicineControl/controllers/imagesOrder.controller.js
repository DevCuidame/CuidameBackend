const imageService = require('../services/imagesOrder.service');

exports.uploadImage = async (req, res) => {
  try {
    // Desestructuramos los datos del body de la solicitud
    const { id, name, base64 } = req.body;

    console.log(req.body);
    console.log(id, name, base64);

    // Verificamos que los datos necesarios estén presentes
    if (!id || !name || !base64) {
      return res.status(400).json({
        error: 'Faltan datos en el payload (id, name, base64 son requeridos).',
      });
    }

    // Llamamos al servicio para guardar la imagen 
    //id_patient - nombre del archivo - archivo
    const savedImage = await imageService.saveImage({ id, name, base64 });

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
