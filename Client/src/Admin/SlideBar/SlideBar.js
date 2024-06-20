import React from 'react'
import './SlideBar.css'

function SlideBar() {
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
                    <li>
                        <a href="#">
                            <span class="links_name">Team</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i class='bx bx-message' ></i>
                            <span class="links_name">Messages</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span class="links_name">Favrorites</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span class="links_name">Setting</span>
                        </a>
                    </li>
                    <li class="log_out">
                        <a href="#">
                            <span class="links_name">Log out</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SlideBar