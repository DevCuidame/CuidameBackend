class ProviderModel {
  constructor(id, providerType, identificationType, identificationNumber, fullName, email, phone, address, city, photoBs64, pubPhoto, privPhoto, status) {
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
      this.photoBs64 = photoBs64;
      this.pubPhoto = pubPhoto;
      this.privPhoto = privPhoto;
      this.status = status;
  }
}
