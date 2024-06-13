const express = require('express');
const router = express.Router();
const OrderController = require('../Controllers/Order.Controller');

// Route to add an item to the cart
router.post('/orderdetails', OrderController.createOrderForm);
router.get('/getorder', OrderController.getOrder);


module.exports = router;
