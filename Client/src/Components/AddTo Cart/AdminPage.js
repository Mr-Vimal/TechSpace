// // AdminPage.js

// import React, { useState } from 'react';
// import axios from 'axios';

// const AdminPage = () => {
//     const [pdfUrl, setPdfUrl] = useState('');

//     const getPdf = async () => {
//         try {
//             const response = await axios.get('http://localhost:3002/mail/getPdf/quote.pdf', {
//                 responseType: 'blob' // Important: responseType must be blob to handle PDF files correctly
//             });

//             const blob = new Blob([response.data], { type: 'application/pdf' });
//             const url = URL.createObjectURL(blob);
//             setPdfUrl(url);
//         } catch (error) {
//             console.error('Error fetching PDF:', error);
//         }
//     };

//     return (
//         <div>
//             <h1>Admin Page</h1>
//             <button onClick={getPdf}>Fetch PDF</button>
//             {pdfUrl && (
//                 <iframe
//                     title="Quote PDF"
//                     src={pdfUrl}
//                     width="100%"
//                     height="600px"
//                     style={{ border: 'none' }}
//                 />
//             )}
//         </div>
//     );
// };

// export default AdminPage;
// AdminPage.js

import React, { useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
    const [pdfUrl, setPdfUrl] = useState('');

    const getPdf = async () => {
        try {
            const response = await axios.get('http://localhost:3002/mail/getPdf/quote.pdf', {
                responseType: 'blob' // Important: responseType must be blob to handle PDF files correctly
            });

            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            setPdfUrl(url);
        } catch (error) {
            console.error('Error fetching PDF:', error);
        }
    };

    return (
        <div>
            <h1>Admin Page</h1>
            <button onClick={getPdf}>Fetch PDF</button>
            {pdfUrl && (
                <iframe
                    title="Quote PDF"
                    src={pdfUrl}
                    width="100%"
                    height="600px"
                    style={{ border: 'none' }}
                />
            )}
        </div>
    );
};

export default AdminPage;
