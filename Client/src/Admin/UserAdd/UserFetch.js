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
                                <tr className='user-tr'>
                                    <th className='user-th'>First Name</th>
                                    <th className='user-th'>Last Name</th>
                                    <th className='user-th'>Email</th>
                                    <th className='user-th'>Phone Number</th>
                                    <th className='user-th'>Crud</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.id}>
                                        <td className='user-td'>{user.FirstName}</td>
                                        <td className='user-td'>{user.LastName}</td>
                                        <td className='user-td'>{user.Email}</td>
                                        <td className='user-td'>{user.PhoneNumber}</td>
                                        <td className='user-td'>
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
            {showAddUser && <UserAdd onClose={() => setShowAddUser(false)} />} {/* Render UserFetch conditionally */}
        </div>
    );
}
