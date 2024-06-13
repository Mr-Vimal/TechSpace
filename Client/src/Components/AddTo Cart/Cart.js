import React, { useContext } from "react";
import { CartContext } from '../../Context/CartContext';
import {useNavigate } from 'react-router-dom';

import './Cart.css';
import Navbar from "../Navbar/Navbar";

export default function CartPage() {
    const navigate = useNavigate();

    const { cart, removeFromCart, clearCart, addToCart, removeRow } = useContext(CartContext);

    const getTotalCartCount = () => {
        return cart.reduce((acc, item) => acc + item.quantity, 0);
    };

    const getTotalCartPrice = () => {
        return cart.reduce((acc, item) => acc + item.totalPrice, 0);
    };
    const handleCheckout = () => {
        navigate('/checkout');
    };
    return (
        <>
        <Navbar/>
        <div className='cart-page'>
            <h2>Cart</h2>
            <button onClick={clearCart}>Clear Cart</button>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div>
                    <table className="cart-items">
                        <thead>
                            <tr>
                                <th className="cart-head">Image</th>
                                <th className="cart-head">Name</th>
                                <th className="cart-head">Category</th>
                                <th className="cart-head">Unit Price</th>
                                <th className="cart-head">Quantity</th>
                                <th className="cart-head">Total Price</th>
                                <th className="cart-head">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map(item => (
                                <tr key={item._id}>
                                    <td><img src={item.Img} alt={item.ProductBrand} className="cart-item-image" /></td>
                                    <td>{item.ProductBrand}</td>
                                    <td>{item.ProductCategory}</td>
                                    <td>${item.Price}</td>
                                    <td>
                                        <button onClick={() => removeFromCart(item._id)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => addToCart(item)}>+</button>
                                    </td>
                                    <td>${item.totalPrice.toFixed(2)}</td>
                                    <td><button onClick={() => removeRow(item._id)}>Remove</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="cart-summary">
                        <h3>Cart Summary</h3>
                        <p>Total Items: {getTotalCartCount()}</p>
                        <p>Total Price: ${getTotalCartPrice().toFixed(2)}</p>
                            <button className="checkout-cart" onClick={handleCheckout}>Checkout</button>
                    </div>
                </div>
            )}
        </div>
        </>
    );
}
