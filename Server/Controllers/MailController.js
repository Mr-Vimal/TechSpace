const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const Payment = require('../Models/Payment.Model'); // Import your Payment model

const sendQuoteByEmail = async (req, res) => {
    try {
        const { tableData, userId } = req.body; // Assume userId is passed in the request body

        if (!tableData || !Array.isArray(tableData) || tableData.length === 0) {
            throw new Error('Invalid tableData');
        }

        const orderId = uuidv4();
        const pdfFilename = `quote_${orderId}.pdf`;
        const pdfPath = path.join(__dirname, '..', '..', 'Client', 'public', 'Quotes', pdfFilename);
        const pdfDoc = new PDFDocument();
        pdfDoc.pipe(fs.createWriteStream(pdfPath));

        pdfDoc.fontSize(12);
        pdfDoc.font('Helvetica');
        pdfDoc.fillColor('#333').font('Helvetica-Bold').fontSize(18).text('Quote Details', { align: 'center' }).moveDown(1);
        pdfDoc.font('Helvetica-Bold').fontSize(12).text('Brand', 50, 200, { width: 100, align: 'left' })
            .text('Model', 150, 200, { width: 150, align: 'left' })
            .text('Price', 300, 200, { width: 100, align: 'left' })
            .text('Quantity', 400, 200, { width: 100, align: 'left' })
            .text('Total Price', 500, 200, { width: 100, align: 'left' });

        let yPos = 230;
        tableData.forEach(item => {
            pdfDoc.font('Helvetica').fontSize(12).text(item.brand, 50, yPos, { width: 100, align: 'left' })
                .text(item.model, 150, yPos, { width: 150, align: 'left' })
                .text(item.price.toString(), 300, yPos, { width: 100, align: 'left' })
                .text(item.quantity.toString(), 400, yPos, { width: 100, align: 'left' })
                .text((item.price * item.quantity).toString(), 500, yPos, { width: 100, align: 'left' });
            yPos += 20;
        });

        pdfDoc.end();

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: 'mrvimal0501@gmail.com', pass: 'fbrf hekb wqaz pvuw' }
        });

        let mailOptions = {
            from: 'mrvimal0501@gmail.com',
            to: 'mrvimal0501@gmail.com',
            subject: 'Quote Details',
            html: 'Please find attached your quote.',
            attachments: [{ filename: pdfFilename, path: pdfPath }]
        };

        await transporter.sendMail(mailOptions);

        // Save PDF URL in the database
        const pdfUrl = `http://localhost:3002/Quotes/${pdfFilename}`;
        await Payment.updateOne({ userId }, { $set: { pdfUrl } });

        res.status(200).json({ message: 'Quote sent successfully', orderId });
    } catch (error) {
        console.error('Error sending quote:', error);
        res.status(500).json({ message: 'Failed to send quote' });
    }
};

module.exports = { sendQuoteByEmail };
