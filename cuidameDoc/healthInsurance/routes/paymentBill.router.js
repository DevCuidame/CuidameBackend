const express = require('express');
const router = express.Router();
const paymentBillController = require('../controllers/paymentBill.controller');

router.post('/', paymentBillController.createPaymentBill);
router.get('/:id', paymentBillController.getPaymentBill);
router.get('/', paymentBillController.getAllPaymentBills);
router.put('/:id', paymentBillController.updatePaymentBill);
router.delete('/:id', paymentBillController.deletePaymentBill);

module.exports = router;
