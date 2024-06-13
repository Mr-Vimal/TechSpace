// PaymentRoutes.js

const express = require('express');
const router = express.Router();
const paymentController = require('../Controllers/Payment.Controller');

// Define routes
router.post('/create-payment', paymentController.createPayment);
router.get('/getPayment', paymentController.getPayment);

module.exports = router;
                                                            