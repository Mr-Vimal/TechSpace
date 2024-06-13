// // MailController.js

// const { sendEmail } = require('../Controllers/MailController');

// // Mock database to simulate saving quotes
// let quotesDB = [];

// // Create a new quote and save it to the database
// const createQuote = async (req, res) => {
//     try {
//         // Assuming request body contains necessary data for the quote
//         const { productName, quantity, price } = req.body;

//         // Simulate saving quote to database (replace with actual database logic)
//         const newQuote = {
//             id: quotesDB.length + 1,
//             productName,
//             quantity,
//             price
//         };
//         quotesDB.push(newQuote);

//         res.status(201).json({ message: 'Quote created successfully', quote: newQuote });
//     } catch (error) {
//         console.error('Error creating quote:', error);
//         res.status(500).json({ error: 'Failed to create quote' });
//     }
// };

// // Send a quote email
// const sendQuoteEmail = async (req, res) => {
//     const { to, subject, text, attachments } = req.body;

//     // Validate request data
//     if (!to || !subject || !text) {
//         return res.status(400).json({ error: 'Missing required fields in request body' });
//     }

//     try {
//         const emailSent = await sendEmail(to, subject, text, attachments);

//         if (emailSent) {
//             res.status(200).json({ message: 'Email sent successfully' });
//         } else {
//             res.status(500).json({ error: 'Failed to send email' });
//         }
//     } catch (error) {
//         console.error('Error sending email:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };



// module.exports = {
//     createQuote,
//     sendQuoteEmail
// };
