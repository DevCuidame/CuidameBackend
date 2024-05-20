class DocumentModel {
  constructor(id, provider_id, pub_name, priv_name, file_bs64) {
    this.id = id || null;
    this.provider_id = provider_id;
    this.pub_name = pub_name;
    this.priv_name = priv_name;
    this.file_bs64 = file_bs64;
  }
}
