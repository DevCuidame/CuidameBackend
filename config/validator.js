// validator.js

const validator = {
  validateEmail: function (email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  },

  validatePhone: function (phone) {
    const re = /^\+?[0-9]{1,15}$/;
    return re.test(String(phone));
  },

  validateURL: function (url) {
    const re =
      /^(https?:\/\/)?([a-zA-Z0-9.-]+)?\.[a-zA-Z]{2,}(:[0-9]{1,5})?(\/[^\s]*)?$/;
    return re.test(String(url).toLowerCase());
  },

  validatePostalCode: function (postalCode) {
    const re = /^\d{5}$/;
    return re.test(String(postalCode));
  },

  validateDate: function (date) {
    const re = /^\d{4}-\d{2}-\d{2}$/;
    return re.test(String(date));
  },

  validatePassword: function (password) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return re.test(String(password));
  },
};

module.exports = validator;
