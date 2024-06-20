import React from 'react';
import CartPage from './Cart';

const CartPopup = () => {
    return (
        <div className="cart-popup">
            <CartPage/>
            <p>This is the cart popup content</p>
        </div>
    );
};

export default CartPopup;
