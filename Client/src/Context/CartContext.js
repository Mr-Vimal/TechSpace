import React, { createContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const saveCartToLocalStorage = (cart) => {
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    const addToCart = (product) => {
        setCart(prevCart => {
            const existingProduct = prevCart.find(item => item._id === product._id);
            let updatedCart;
            if (existingProduct) {
                updatedCart = prevCart.map(item =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + 1, totalPrice: item.totalPrice + item.Price }
                        : item
                );
                    
            } else {
                updatedCart = [...prevCart, { ...product, quantity: 1, totalPrice: product.Price }];
            }
            saveCartToLocalStorage(updatedCart);
            toast.success(`${product.ProductName} added to cart!`);
            return updatedCart;
        });
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => {
            const existingProduct = prevCart.find(item => item._id === productId);
            let updatedCart;
            if (existingProduct.quantity > 1) {
                updatedCart = prevCart.map(item =>
                    item._id === productId
                        ? { ...item, quantity: item.quantity - 1, totalPrice: item.totalPrice - item.Price }
                        : item
                );
            } else {
                updatedCart = prevCart.filter(item => item._id !== productId);
            }
            saveCartToLocalStorage(updatedCart);
             toast.warn(`${existingProduct.productName} removed from cart!`);
            return updatedCart;
        });
    };
    <ToastContainer />
    const removeRow = (id) => {
        setCart(prevCart => prevCart.filter(item => item._id !== id));
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('cart');
        toast.info(`Cart Cleared`);

    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, removeRow, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};