const fs = require("fs");

async function buildPdf(dir, folder, base64) {
  try {
    const decoding = base64.replace(/^data:application\/pdf;base64,/, "");
    const directoryPath = `./uploads/documents/${folder}/`;

    await fs.promises.writeFile(`${directoryPath}${dir}.pdf`, decoding, {
      encoding: "base64",
    });
  } catch (error) {
    throw new Error("Error al construir el PDF");
  }
}

async function deletePdf(dir, folder) {
  try {
    const path = `/uploads/documents/${folder}/${dir}.pdf`;
    await fs.promises.unlink(path);
  } catch (error) {
    throw new Error("Error al eliminar el PDF");
  }
}

module.exports = {
  buildPdf,
  deletePdf,
};
