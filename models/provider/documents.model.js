class DocumentModel {
  constructor(id, provider_id, own, establishment_name, pubName, privName, base64) {
    this.id = id || null;
    this.provider_id = provider_id;
    this.own = own;
    this.establishment_name = establishment_name;
    this.pubName = pubName;
    this.privName = privName;
    this.base64 = base64;
  }
}
