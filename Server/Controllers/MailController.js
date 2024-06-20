const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const sendQuoteByEmail = async (req, res) => {
    try {
        const { tableData } = req.body;

        // Check if tableData is defined and has a valid value
        if (!tableData || !Array.isArray(tableData) || tableData.length === 0) {
            throw new Error('tableData is undefined, empty, or not an array');
        }

        // Generate PDF
        const pdfPath = path.join(__dirname, '..', '..', 'Client', 'public', 'Quotes', 'quote.pdf');
        const pdfDoc = new PDFDocument();
        pdfDoc.pipe(fs.createWriteStream(pdfPath));

        // Set up PDF styles
        pdfDoc.fontSize(12);
        pdfDoc.font('Helvetica');

        // Header
        pdfDoc
            .fillColor('#333')
            .font('Helvetica-Bold')
            .fontSize(18)
            .text('Quote Details', { align: 'center' })
            .moveDown(1);

        // Table header
        pdfDoc
            .font('Helvetica-Bold')
            .fontSize(12)
            .text('Brand', 50, 200, { width: 100, align: 'left' })
            .text('Model', 150, 200, { width: 150, align: 'left' })
            .text('Price', 300, 200, { width: 100, align: 'left' })
            .text('Quantity', 400, 200, { width: 100, align: 'left' })
            .text('Total Price', 500, 200, { width: 100, align: 'left' });

        // Table rows
        let yPos = 230;
        tableData.forEach(item => {
            pdfDoc
                .font('Helvetica')
                .fontSize(12)
                .text(item.brand, 50, yPos, { width: 100, align: 'left' })
                .text(item.model, 150, yPos, { width: 150, align: 'left' })
                .text(item.price.toString(), 300, yPos, { width: 100, align: 'left' })
                .text(item.quantity.toString(), 400, yPos, { width: 100, align: 'left' })
                .text((item.price * item.quantity).toString(), 500, yPos, { width: 100, align: 'left' });
            yPos += 20;
        });

        // End and save PDF
        pdfDoc.end();

        // Create transporter
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'mrvimal0501@gmail.com', // Your Gmail address
                pass: 'fbrf hekb wqaz pvuw' // Your Gmail password
            }
        });

        // Define email options
        let mailOptions = {
            from: 'mrvimal0501@gmail.com', // Sender address
            to: 'mrvimal0501@gmail.com', // Recipient address
            subject: 'Quote Details', // Email subject
            html: 'Please find attached your quote.', // HTML body of the email
            attachments: [
                {
                    filename: 'quote.pdf',
                    path: pdfPath
                }
            ]
        };

        // Send email
        await transporter.sendMail(mailOptions);

        // Respond with success message
        res.status(200).json({ message: 'Quote sent successfully' });
    } catch (error) {
        console.error('Error sending quote:', error);
        res.status(500).json({ message: 'Failed to send quote' });
    }
};

module.exports = {
    sendQuoteByEmail
};
