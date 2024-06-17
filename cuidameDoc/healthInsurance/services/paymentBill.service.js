// services/PaymentBillService.js
const paymentBillRepository = require('../repositories/paymentBill.repository');

exports.createPaymentBill = async (health_insurance_id, relative_id, doctor_service_id) => {
  return paymentBillRepository.createPaymentBill(health_insurance_id, relative_id, doctor_service_id);
};

exports.getPaymentBill = async (id) => {
  return paymentBillRepository.getPaymentBill(id);
};

exports.getAllPaymentBills = async () => {
  return paymentBillRepository.getAllPaymentBills();
};

exports.updatePaymentBill = async (id, health_insurance_id, relative_id, doctor_service_id) => {
  return paymentBillRepository.updatePaymentBill(id, health_insurance_id, relative_id, doctor_service_id);
};

exports.deletePaymentBill = async (id) => {
  return paymentBillRepository.deletePaymentBill(id);
};
