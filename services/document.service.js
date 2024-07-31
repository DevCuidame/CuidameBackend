const documentRepository = require('../repositories/document.repository');

exports.createDocument = async (data) => {
  return documentRepository.createDocument(data);
};

exports.getDocument = async (id) => {
  return documentRepository.getDocument(id);
};

exports.updateDocument = async (id, data) => {
     const { provider_id, pub_name, priv_name, file_bs64 } = data;
  return documentRepository.updateDocument(id, provider_id, pub_name, priv_name, file_bs64);
};

exports.deleteDocument = async (id) => {
  return documentRepository.deleteDocument(id);
};
