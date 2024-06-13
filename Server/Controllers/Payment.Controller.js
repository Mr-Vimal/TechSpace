const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Ensure this line is correct
const Payment = require('../Models/Payment.Model'); // Adjust the path if necessary

const createPayment = async (req, res) => {
    try {
        const { token, product, formData } = req.body;

        // Log incoming request data for debugging
        console.log('Request body:', req.body);

        if (!product || !product.price) {
            return res.status(400).json({ error: 'Invalid product data' });
        }

        // Create a Stripe payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: product.price,
            currency: 'usd',
            description: product.name,
            payment_method_types: ['card'],
            receipt_email: formData.email,
            shipping: {
                name: formData.fullName,
                address: {
                    line1: formData.address,
                    city: formData.city,
                    country: formData.country,
                    postal_code: formData.postalCode
                }
            }
        });

        // Save payment information to your database
        const payment = new Payment({
            name: formData.fullName,
            amount: product.price,
            paymentIntentId: paymentIntent.id,
            address: formData.address
        });

        await payment.save();

        // Send client secret to frontend
        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updatePaymentStatus = async (req, res) => {
    try {
        const { paymentIntentId, status, userId, amount, bookingId } = req.body;
        if (!paymentIntentId || !status || !userId || !amount || !bookingId) {
            return res.status(400).json({ error: 'Invalid request body' });
        }

        const payment = await Payment.findOneAndUpdate(
            { paymentIntentId },
            { status },
            { new: true }
        );

        if (!payment) {
            return res.status(404).json({ error: 'Payment not found' });
        }

        res.status(200).json(payment);
    } catch (error) {
        console.error('Error updating payment status:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const getPayment = async (req, res) => {
    try {
        const payments = await Payment.find();
        res.json(payments);
    } catch (err) {
        console.error('Error fetching notes:', err);
        res.status(500).json({ error: 'An error occurred while fetching notes' });
    }
};

module.exports = {
    createPayment,
    getPayment,
    updatePaymentStatus
};
