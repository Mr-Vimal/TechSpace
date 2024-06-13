
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'  // Reference to the User model
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product'  // Reference to the Product model
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            productOptions: {
                size: {
                    type: String,
                    required: false
                },
                color: {
                    type: String,
                    required: false
                }
            },
            dateAdded: {
                type: Date,
                default: Date.now  // Automatically set the date when the item is added
            }
        }
    ]
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem;
