import React, { useState, useEffect, useContext } from "react";
import './Product.css'
import Navbar from "../../Components/Navbar/Navbar";
// import productImg from './board.png'
// import SearchBar from "../../Components/Searchbar/Searchbar";
// import PriceBar from "../../Components/Price-Bar/Price-Bar";
// import ProductCard from "../../Admin/Product";
import Card from "../../Components/Card/Card";
// import CreateProduct from "../../Admin/Product";
// import UserAdd from "../../Admin/UserAdd/UserAdd";
import { CartContext } from '../../Context/CartContext';



export default function Products() {
    const { addToCart, cart } = useContext(CartContext);


    return (
        <>
        {/* <Navbar/> */}
            <Navbar cartCount={cart.length} />

            <div className="product-div">

                <div className="product-component">
                    <div className="price-bar">
                        {/* <CreateProduct /> */}
                    </div>
                    <div className="product-component">
                        <Card />

                    </div>
                </div>
            </div>
        </>
    )
}