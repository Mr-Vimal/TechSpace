import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../../Context/CartContext';
import './Card.css';
import Navbar from "../Navbar/Navbar";

export default function ProductPage() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3002/product/getProduct');
                setProducts(response.data);
                setFilteredProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchData();
    }, []);

    const handleSearchInputChange = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearchTerm(searchTerm);
        filterProducts(searchTerm, minPrice, maxPrice);
    };

    const handleSearch = () => {
        filterProducts(searchTerm, minPrice, maxPrice);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        } else if (event.key === 'Backspace' && searchTerm === '') {
            setFilteredProducts(products);
        }
    };

    const handleMinPriceChange = (event) => {
        const price = event.target.value;
        setMinPrice(price);
        filterProducts(searchTerm, price, maxPrice);
    };

    const handleMaxPriceChange = (event) => {
        const price = event.target.value;
        setMaxPrice(price);
        filterProducts(searchTerm, minPrice, price);
    };

    const filterProducts = (searchTerm, minPrice, maxPrice) => {
        const min = minPrice !== '' ? parseFloat(minPrice) : 0;
        const max = maxPrice !== '' ? parseFloat(maxPrice) : Number.MAX_VALUE;

        const filtered = products.filter(product => {
            return (
                product.ProductBrand.toLowerCase().includes(searchTerm) ||
                product.ProductName.toLowerCase().includes(searchTerm)
            ) && product.Price >= min && product.Price <= max;
        });

        setFilteredProducts(filtered);
    };

    const handleAddToQuote = (product) => {
        navigate('/dropdown', { state: { product } });
    };

    const filterByCategory = (category) => {
        if (category === 'All') {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(product => product.ProductCategory.toLowerCase() === category.toLowerCase());
            setFilteredProducts(filtered);
        }
    };

    const handleProductClick = (productId) => {
        navigate(`/productdetails/${productId}`);
    };

    return (
        <>
            <div className='product-main'>

                <div className="product-page">
                    <div className='product-left'>
                        <div className="search-container">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={handleSearchInputChange}
                                onKeyPress={handleKeyPress}
                                className="search-input"
                            />
                        </div>
                        <div className="price-range">
                            <label>Price Range:</label>
                            <div className="price-inputs">
                                <input
                                    type="number"
                                    value={minPrice}
                                    onChange={handleMinPriceChange}
                                    className="price-input"
                                    placeholder="Min Price"
                                />
                                <input
                                    type="number"
                                    value={maxPrice}
                                    onChange={handleMaxPriceChange}
                                    className="price-input"
                                    placeholder="Max Price"
                                />
                            </div>
                        </div>
                        <div className="category-filters">
                            <div className="btn-filters">
                                <button className="category-btns" onClick={() => filterByCategory('All')}>All</button>
                                <button className="category-btns" onClick={() => filterByCategory('Motherboard')}>Motherboard</button>
                                <button className="category-btns" onClick={() => filterByCategory('Processor')}>Processor</button>
                                <button className="category-btns" onClick={() => filterByCategory('Hard Disk')}>Hard Disk</button>
                                <button className="category-btns" onClick={() => filterByCategory('RAM')}>RAM</button>
                                <button className="category-btns" onClick={() => filterByCategory('Casing')}>Casing</button>
                                <button className="category-btns" onClick={() => filterByCategory('Cooler')}>Cooler</button>
                                <button className="category-btns" onClick={() => filterByCategory('Graphic Card')}>Graphic Card</button>
                            </div>
                        </div>
                    </div>

                    <div className="product-component">
                        <div className="product-container">
                            {filteredProducts.map((product) => (
                                <div className="product-card" key={product._id}>
                                    <div className="product-image" onClick={() => handleProductClick(product._id)}>
                                        <img src={product.Img} alt={product.ProductName} className="prod-img" />
                                    </div>
                                    <div className="card-flex">
                                        <div className="card-price">
                                            <div className="brand">
                                                <p className="product-description">{product.ProductBrand}</p>
                                            </div>
                                            <div className="product-details">
                                                <h3 className="product-name">{product.ProductName}</h3>
                                            </div>
                                            <div className="product-price">Rs{product.Price}</div>
                                        </div>
                                        <div className="product-buttons">
                                            <button className="add-to-cart" onClick={() => addToCart(product)}>Add to Cart</button>
                                            <button className="view-details-btn" onClick={() => handleAddToQuote(product)}>Add to Quote</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
