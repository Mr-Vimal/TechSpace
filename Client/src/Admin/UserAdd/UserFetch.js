// UserAdd.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserFetch.css';
import Admin from '../Admin';
import UserAdd from './UserAdd'; // Import the UserFetch component

export default function UserFetch() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [showAddUser, setShowAddUser] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3002/user')
            .then(response => setUsers(response.data))
            .catch(error => {
                console.error('Error fetching users:', error);
                setError('An error occurred while fetching users. Please try again later.');
            });
    }, []);

    const toggleAddUser = () => {
        setShowAddUser(!showAddUser);
    };

    return (
        <div>
            <div className='admin-dashboard'>
                <div className='dashboard-flexx'>
                    <Admin />
                </div>
                <div className='user-table'>
                    {error ? (
                        <div>Error: {error}</div>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                    <th>Crud</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.FirstName}</td>
                                        <td>{user.LastName}</td>
                                        <td>{user.Email}</td>
                                        <td>{user.PhoneNumber}</td>
                                        <td>
                                            <button className='edit' type='button'>Edit</button>
                                            <button className='delete' type='button'>Delete</button>
                                            <button className='add' type='button' onClick={toggleAddUser}>Add</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
            {showAddUser && <UserFetch onClose={() => setShowAddUser(false)} />} {/* Render UserFetch conditionally */}
        </div>
    );
}
