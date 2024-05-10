class TransactionData {
    constructor(reference, amount, currency, signature, redirectUrl, expirationTime, taxInCents, customerData, shippingAddress) {
        this.reference = reference;
        this.amount = amount;
        this.currency = currency;
        this.signature = signature;
        this.redirectUrl = redirectUrl;
        this.expirationTime = expirationTime;
        this.taxInCents = taxInCents;
        this.customerData = customerData;
        this.shippingAddress = shippingAddress;
    }
}

class Signature {
    constructor(integrity) {
        this.integrity = integrity;
    }
}

class Tax {
    constructor(consumption, vat) {
        this.consumption = consumption;
        this.vat = vat;
    }
}

class CustomerData {
    constructor(email, fullName, phoneNumber, phoneNumberPrefix, legalId, legalIdType) {
        this.email = email;
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.phoneNumberPrefix = phoneNumberPrefix;
        this.legalId = legalId;
        this.legalIdType = legalIdType;
    }
}

class ShippingAddress {
    constructor(addressLine1, addressLine2, country, city, phoneNumber, region, name) {
        this.addressLine1 = addressLine1;
        this.addressLine2 = addressLine2;
        this.country = country;
        this.city = city;
        this.phoneNumber = phoneNumber;
        this.region = region;
        this.name = name;
    }
}

