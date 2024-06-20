import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Admin from '../Admin';

const PaidDetails = () => {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axios.get('https://localhost:3002/payment/getPayment');
                setPayments(response.data);
            } catch (error) {
                console.error('Error fetching payments data:', error);
            }
        };
        fetchPayments();
    }, []);



    return (
        <div>
            <div className='admin-slide'>
                <Admin />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Address</th>
                        <th>Total Amount</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payments, index) => (
                        <tr key={index}>
                            <td>{payments.address}</td>
                            <td>{payments.name}</td>
                            <td>${payments.amount}</td>
                            <td>{new Date(payments.date).toLocaleDateString()}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    );
};

export default PaidDetails;
