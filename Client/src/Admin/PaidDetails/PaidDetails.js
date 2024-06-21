import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Admin from '../Admin';
import './PaidDetails.css'

const PaidDetails = () => {
    const [payments, setPayments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 12; // Number of payments per page

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axios.get('http://localhost:3002/payment/getPayment');
                setPayments(response.data);
            } catch (error) {
                console.error('Error fetching payments data:', error);
            }
        };
        fetchPayments();
    }, []);

    const indexOfLastPayment = currentPage * perPage;
    const indexOfFirstPayment = indexOfLastPayment - perPage;
    const currentPayments = payments.slice(indexOfFirstPayment, indexOfLastPayment);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(payments.length / perPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <div className='admin-slide'>
                <Admin />
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Address</th>
                        <th>Total Amount</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPayments.map((payment, index) => (
                        <tr key={index}>
                            <td className='payment-td'>{payment.name}</td>
                            <td className='payment-td'>{payment.address}</td>
                            <td className='payment-td'>Rs {payment.amount}</td>
                            <td className='payment-td'>{new Date(payment.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                        <button onClick={() => handlePageChange(number)} className="page-link">
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PaidDetails;
