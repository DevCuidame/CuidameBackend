const { configureMulter } = require("../../middlewares/uploadImage");
const service = require("../../services/document.service");
const PdfHandler = require("../../utils/pdfHandler");


exports.createDocument = async (req, res) => {
  try {
    const privateDoc = 'PDF_' + Date.now() + "." + req.privName.split('.')[1];

    

    const doc = await service.createDocument(req.body);
    res.json(doc);
  } catch (error) {
    res.status(400).json({ error: error.message });
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
