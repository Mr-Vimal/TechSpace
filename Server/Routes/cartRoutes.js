const express = require('express');
const router = express.Router();
const cartController = require('../Controllers/CartControllo');

// Route to add an item to the cart
router.post('/add', cartController.addToCart);

// Route to get cart items for a specific user
router.get('/:userId', cartController.getCartItems);

module.exports = router;
