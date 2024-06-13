import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaidDetails = () => {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axios.get('https://techspace-xdcd.onrender.com/payment/getPayment');
                setPayments(response.data);
            } catch (error) {
                console.error('Error fetching payments data:', error);
            }
        };
        fetchPayments();
    }, []);

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('https://techspace-xdcd.onrender.com/payment/getPayment');
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching payments data:', error);
            }
        };
        fetchOrders();
    }, []);


    return (
        <div>
            <h1>Admin Page</h1>
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
                            <td>{payments.name}</td>
                            {/* <td>{payments.address}</td> */}
                            <td>${payments.amount}</td>
                            <td>{new Date(payments.date).toLocaleDateString()}</td>
                        </tr>
                    ))}
                    {/* {orders.map((payments, index) => (
                        <tr key={index}>
                            <td>{payments.name}</td>
                            <td>{payments.address}</td>
                            <td>{payments.city}</td>
                            <td>{payments.country}</td>
                            <td>{payments.postalCode}</td>
                            <td>${payments.amount}</td>
                            <td>{new Date(payments.date).toLocaleDateString()}</td>
                        </tr>
                    ))} */}
                </tbody>
            </table>
        </div>
    );
};

export default PaidDetails;
