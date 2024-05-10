class ProviderModel {
  constructor(id, providerType, identificationType, identificationNumber, fullName, email, phone, address, city, photoBs4, pubPhoto, privPhoto, status) {
      this.id = id || null;
      this.providerType = providerType;
      this.identificationType = identificationType;
      this.identificationNumber = identificationNumber;
      this.fullName = fullName;
      this.email = email;
      this.phone = phone;
      this.address = address;
      this.city = city;
      this.phone = phone;
      this.photo = photoBs4;
      this.pubPhoto = pubPhoto;
      this.privPhoto = privPhoto;
      this.status = status;
  }
}
