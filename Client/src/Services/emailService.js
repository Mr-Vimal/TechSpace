// Import necessary dependencies
import emailjs from 'emailjs-com';
import jsPDF from 'jspdf'; 

// Function to send email with PDF attachment
export const sendEmail = (tableData) => {
    const doc = new jsPDF();
    // Generate PDF content here...

    // Convert PDF to data URI
    const pdfDataUri = doc.output('datauristring');

    // Send email with PDF attachment
    const emailParams = {
        to_email: 'recipient@example.com',
        from_name: 'Your Name',
        message_html: 'Please find the quotation attached.',
        attachment: pdfDataUri, // Attach PDF data URI
    };

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', emailParams, 'YOUR_USER_ID')
        .then((response) => {
            console.log('Email sent:', response);
            alert('Email sent successfully!');
        })
        .catch((error) => {
            console.error('Error sending email:', error);
            alert('An error occurred while sending the email.');
        });
};
