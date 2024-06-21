import './SlideBar.css'
import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

function SlideBar() {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        toast.success('Admin has been logged out successfully.', {
            autoClose: 3000, // toast will close after 3 seconds
        });
        navigate('/');
    };
    return (
        <div>
            <div class="sidebar">
                <div class="logo-details">
                    <span class="logo_name"> Admin </span>
                </div>
                <ul class="nav-links">
                    <li>
                        <a href="/" class="active">
                            <span class="links_name">Home</span>
                        </a>
                    </li>
                    <li>
                        <a href="/admin">
                            <span class="links_name">Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="/datashowing">
                            <span class="links_name">Products</span>
                        </a>
                    </li>
                    <li>
                        <a href="/useradd">
                            <span class="links_name">Users</span>
                        </a>
                    </li>
                    <li>
                        <a href="/paiddata">
                            <span class="links_name">Payments</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span class="links_name">Total order</span>
                        </a>
                    </li>
                    <li onClick={logout}class="log_out">
                        <a href="/">
                            <span class="links_name">Log out</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SlideBar