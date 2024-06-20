import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Navbar.css";
import CartPage from "../AddTo Cart/Cart"; // Correct import path for CartPage
import Logo1 from '../../Assets/logo11.png';
import ProfileImage from '../../Assets/logo12.png';

export default function Navbar() {
  const [cartVisible, setCartVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState(ProfileImage);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      const fetchedProfileImage = localStorage.getItem('profileImage');
      if (fetchedProfileImage) {
        setProfileImage(fetchedProfileImage);
      }
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    toast.success('You have been logged out successfully.');
    navigate('/');
  };

  const toggleCartVisibility = () => {
    setCartVisible(prevVisible => !prevVisible); // Toggle cartVisible state
  };

  const toggleDropdownVisibility = () => {
    setDropdownVisible(prevVisible => !prevVisible); // Toggle dropdownVisible state
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <>
      <nav className="navbar">
        <div className="navdiv">
          <div className="logoo">
            <Link to="/"><img src={Logo1} className="tech" alt="Logo" />TECH SPACE</Link>
          </div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/customBuild">Custom Build</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            {/* Ensure onClick is set to toggleCartVisibility */}
            <li><a href="#" onClick={toggleCartVisibility}><FontAwesomeIcon icon={faShoppingCart} /></a></li>
            <li>
              {isLoggedIn ? (
                <div className="profile-dropdown">
                  <img
                    src={profileImage}
                    alt=""
                    className="profile-image"
                    onClick={toggleDropdownVisibility}
                  />
                  {dropdownVisible && (
                    <div className="dropdown-menu">
                      <Link to="/accountsetting">Account Setting</Link>
                      <Link to="/passwordchange">Change Password</Link>
                      <Link to="/info">Info</Link>
                      <button className="logout-home-btn" onClick={logout}>Logout</button>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <button className="login-home-btn" onClick={handleLoginClick}>LogIn</button>
                </div>
              )}
            </li>
          </ul>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="1512" height="32" viewBox="0 0 1512 32" fill="none">
          <path d="M-52 2H691.793L724.082 30H1279.2H1695" stroke="#32E3D9" stroke-opacity="0.61" stroke-width="4" />
        </svg>
        <ToastContainer />
      </nav>
      <div>      {cartVisible && <CartPage onClose={toggleCartVisibility} />} {/* Ensure onClose prop is passed correctly */}
      </div>
    </>)
}
