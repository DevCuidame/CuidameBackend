class ProviderModel {
  constructor(id, provider_type, identification_type, identification_number, full_name, email, phone, address, city, photo_bs64, pub_photo, priv_photo, status) {
      this.id = id || null;
      this.provider_type = provider_type;
      this.identification_type = identification_type;
      this.identification_number = identification_number;
      this.full_name = full_name;
      this.email = email;
      this.phone = phone;
      this.address = address;
      this.city = city;
      this.phone = phone;
      this.photo_bs64 = photo_bs64;
      this.pub_photo = pub_photo;
      this.priv_photo = priv_photo;
      this.status = status;
  }
}
