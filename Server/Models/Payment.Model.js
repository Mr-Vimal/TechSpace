// Payment.Model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    paymentIntentId: {
        type: String,
        required: true
    },
    address: {
        type: String,
        // required: true
    },
    pdfUrl: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
