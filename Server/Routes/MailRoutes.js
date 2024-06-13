const express = require('express');
const router = express.Router();
const { sendQuoteByEmail } = require('../Controllers/MailController');

// Route to send quote by email
router.post('/sendquote', sendQuoteByEmail);

module.exports = router;
