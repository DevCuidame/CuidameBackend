const fs = require("fs");

async function buildImage(dir, folder, base64) {
  try {
    const decoding = base64.replace(/^data:image\/\w+;base64,/, "");
    const directoryPath = `./uploads/person/${folder}/`;

    await fs.promises.mkdir(directoryPath, { recursive: true });

    await fs.promises.writeFile(`${directoryPath}${dir}`, decoding, {
      encoding: "base64",
    });
  } catch (error) {
    throw new Error("Error al construir la imagen: " + error.message);
  }
}

async function deleteImage(dir, folder) {
  try {
    const path = `./uploads/person/${folder}/${dir}`;
    await fs.promises.unlink(path);
  } catch (error) {
    throw new Error("Error al eliminar la imagen: " + error.message);
  }
}

module.exports = {
  buildImage,
  deleteImage,
};
