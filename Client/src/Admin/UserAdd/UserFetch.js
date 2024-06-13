import React, { useState } from 'react';
import axios from 'axios';

export default function UserFetch({ onClose }) {
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [Email, setEmail] = useState('');
    const [PhoneNumber, setPhoneNumber] = useState('');
    const [Password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const userData = {
            FirstName,
            LastName,
            Email,
            PhoneNumber,
            Password
        };

        try {
            // Make a POST request to the server to save the user data
            const response = await axios.post('http://localhost:3002/user/create', userData);
            console.log('Response:', response.data);
            // Optionally, you can handle success response here, e.g., show a success message
            alert('User added successfully!');
            // Clear form fields after successful submission
            setFirstName('');
            setLastName('');
            setEmail('');
            setPhoneNumber('');
            onClose(); // Close the popup form
        } catch (error) {
            // Handle errors
            console.error('Error:', error);
            setError('An error occurred while processing your request. Please try again later.');
        }
    };

    const handleCancel = () => {
        // Clear form fields and close the form
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhoneNumber('');
        onClose(); // Close the popup form
    };

    return (
        <div className="add-user-overlay">
            <div className="add-user-form">
                <h2>Add User</h2>
                <form onSubmit={handleSubmit}>
                    <label>First Name</label>
                    <input type="text" value={FirstName} onChange={(e) => setFirstName(e.target.value)} required />
                    <label>Last Name</label>
                    <input type="text" value={LastName} onChange={(e) => setLastName(e.target.value)} required />
                    <label>Email</label>
                    <input type="email" value={Email} onChange={(e) => setEmail(e.target.value)} required />
                    <label>Phone Number</label>
                    <input type="tel" value={PhoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                    <label>Password</label>
                    <input type="tel" value={Password} onChange={(e) => setPassword(e.target.value)} required />
                    <div className="form-buttons">
                        <button type="submit" className="save-button">Add</button>
                        <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
                {error && <div>Error: {error}</div>}
            </div>
        </div>
    );
}
