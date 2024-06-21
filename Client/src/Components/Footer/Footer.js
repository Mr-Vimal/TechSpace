import React from 'react';
import './Footer.css';

export default function Footer() {
    return (
        <div>
            <footer>
                <div class="footer">
                    <div class="row-icons">
                        <a href="#"><i class="fa fa-facebook"></i></a>
                        <a href="#"><i class="fa fa-instagram"></i></a>
                        <a href="#"><i class="fa fa-youtube"></i></a>
                        <a href="#"><i class="fa fa-twitter"></i></a>
                    </div>

                    <div class="row-nav">
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/contact">Contact us</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms & Conditions</a></li>
                            <li><a href="#">Career</a></li>
                        </ul>
                    </div>

                    <div class="row-copyright">
                        TECH SPACE Copyright © 2024 Tech Space - All rights reserved 
                    </div>
                </div>
            </footer>
        </div>
    );
}
