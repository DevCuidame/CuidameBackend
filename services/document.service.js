const documentRepository = require('../repositories/document.repository');

exports.createDocument = async (data) => {
    const {provider_id, own, establishment_name, name, document_url} = data;
  return documentRepository.createDocument(provider_id, own, establishment_name, name, document_url);
};

exports.getDocument = async (id) => {
  return documentRepository.getDocument(id);
};

exports.updateDocument = async (id, data) => {
     const { provider_id, own, establishment_name, name, document_url } = data;
  return documentRepository.updateDocument(id, provider_id, own, establishment_name, name, document_url);
};

exports.deleteDocument = async (id) => {
  return documentRepository.deleteDocument(id);
};
