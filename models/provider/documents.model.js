class DocumentModel {
    constructor(id, provider_id, own, establishment_name, name, document_url) {
      this.id = id || null;
      this.provider_id = provider_id;
      this.own = own;
      this.establishment_name = establishment_name;
      this.name = name;
      this.document_url = document_url;
    }
  }