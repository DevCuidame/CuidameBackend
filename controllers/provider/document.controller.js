const service = require("../../services/document.service");
const PdfHandler = require("../../utils/pdfHandler");

exports.createDocument = async (req, res) => {
  const documents = req.body;
  const { nanoid } = await import("nanoid");

  if (!Array.isArray(documents)) {
    return res.status(400).json({ error: "No hemos podido procesar los documentos" });
  }

  try {
    const results = [];

    for (const document of documents) {
      const { provider_id, pub_name, file_bs64, name } = document;

      const uniqueName = `PDF_${name}_${nanoid(20)}.pdf`;
      const folder = name;

      try {
        await PdfHandler.buildPdf(uniqueName, folder, file_bs64);
         await service.createDocument({
          provider_id,
          pub_name,
          priv_name: uniqueName,
          file_bs64

        });
        results.push({
          provider_id,
          pub_name,
          priv_name: uniqueName,
          status: 'success',
          message: 'Document processed and saved successfully.'
        });
      } catch (error) {
        results.push({
          provider_id,
          pub_name,
          priv_name: null,
          status: 'error',
          message: `Failed to process and save document: ${error.message}`
        });
      }
    }
    
    res.json({ message: "!Documentos cargados correctamente!", results, success: true });
  } catch (error) {
    res.status(400).json({message: "Ha ocurrido un error al cargar los documentos.", error: error.message, success: false });
  }
};




exports.getDocument = async (req, res) => {
  try {
    const document = await service.getDocument(req.params.id);

    if (!document) {
      res.status(404).json({ error: "Document not found" });
      return;
    }

    res.json(document);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateDocument = async (req, res) => {
  try {
    const updatedDocument = await service.updateDocument(
      req.params.id,
      req.body
    );
    res.json(updatedDocument);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteDocument = async (req, res) => {
  try {
    await service.deleteDocument(req.params.id);

    const document = await service.getDocument(req.params.id);
    if (!document) {
      res.status(404).json({ error: "Document not found" });
      return;
    }

    res.json({ message: "Document deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
