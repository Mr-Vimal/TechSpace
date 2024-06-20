const express = require('express');
const router = express.Router();
const { sendQuoteByEmail, getPdf } = require('../Controllers/MailController');

// Route to send quote by email
router.post('/sendquote', sendQuoteByEmail);
// router.post('/getpdf', getPdf);

module.exports = router;
