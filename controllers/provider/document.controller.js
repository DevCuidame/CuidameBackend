const { configureMulter } = require("../../middlewares/uploadImage");
const service = require("../../services/document.service");

exports.createDocument = async (req, res) => {
  try {
    console.log("🚀 ~ exports.createDocument= ~ req.body:", req.body);
    const { provider_id, own, establishment_name } = req.body;
    const prefix = "test";
    const uploadDirectory = "./uploads/pets/documents";

    const multerConfig = configureMulter(uploadDirectory, prefix);

    multerConfig.array("file")(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      const files = req.files;

      if (!files) {
        return res.status(400).json("No hay archivos");
      }

      const uploadedDocuments = [];
      for (const file of files) {
        const newDocument = await service.createDocument({
          provider_id,
          own,
          establishment_name,
          name: file.filename,
          document_url: file.path,
        });
        console.log("🚀 ~ multerConfig.array ~ newDocument:", newDocument);
        uploadedDocuments.push(newDocument);
      }

      res.json(uploadedDocuments);
    });
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
