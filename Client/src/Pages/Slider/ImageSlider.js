import React, { useState, useEffect } from 'react';
import './ImageSlider.css';

const ImageSlider = () => {
    const [products, setProducts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3002/product/getProduct');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [products]);

    return (
        <div className="slider">
            <div className="slider-images" style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}>
                {products.map((product, index) => (
                    <div key={product._id} className="slide">
                        <img src={product.Img} alt={product.ProductName} />
                        <div className="product-info">
                            <h2>{product.ProductName}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageSlider;
                                                                                                                                                                                    