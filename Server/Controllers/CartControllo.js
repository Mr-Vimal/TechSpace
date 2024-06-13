const CartItem = require('../Models/Cart.Model');
const Product = require('../Models/Product.Model');
const User = require('../Models/User.model');

// Add an item to the cart
exports.addToCart = async (req, res) => {
    const { userId, productId, quantity, productOptions } = req.body;

    try {
        // Validate user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Validate product
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Check if the cart already exists for the user
        let cart = await CartItem.findOne({ userId });

        if (!cart) {
            // If no cart exists, create a new one
            cart = new CartItem({ userId, items: [] });
        }

        // Check if the item already exists in the cart
        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId && JSON.stringify(item.productOptions) === JSON.stringify(productOptions));
        if (itemIndex > -1) {
            // If item exists, update the quantity
            cart.items[itemIndex].quantity += quantity;
        } else {
            // If item doesn't exist, add new item to the cart
            cart.items.push({
                productId,
                quantity,
                productOptions
            });
        }

        // Save the cart
        await cart.save();

        res.status(200).json({ message: 'Item added to cart', cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get cart items for a specific user
exports.getCartItems = async (req, res) => {
    const { userId } = req.params;

    try {
        // Validate user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Find the cart for the user
        const cart = await CartItem.findOne({ userId }).populate('items.productId');
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
