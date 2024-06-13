import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Details.css';

export default function Details() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3002/product/find/${productId}`);
                setProduct(response.data);
                console.log('Fetched product details:', response.data);  // Debugging line
            } catch (error) {
                console.error('Error fetching product details:', error);
                setError('An error occurred while fetching product details. Please try again later.');
            }
        };

        fetchProductDetails();
    }, [productId]);

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container container-fluid">
            <div className="row f-flex justify-content-around">
                <div className="col-12 col-lg-5 img-fluid" id="product_image">
                    <img src={product.Img} alt={product.ProductName} height="500" width="500" />
                </div>

                <div className="col-12 col-lg-5 mt-5">
                    <h3>{product.ProductName}</h3>
                    <p id="product_id">{product._id}</p>

                    <hr />

                    <div className="rating-outer">
                        <div className="rating-inner"></div>
                    </div>

                    <hr />

                    <p id="product_price">${product.Price}</p>
                    <div className="stockCounter d-inline">
                        <span className="btn btn-danger minus">-</span>

                        <input type="number" className="form-control count d-inline" value="1" readOnly />

                        <span className="btn btn-primary plus">+</span>
                    </div>
                    <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4">Add to Cart</button>

                    <hr />

                    <p>Status: <span id="stock_status">In Stock</span></p>

                    <hr />

                    <h4 className="mt-2">Description:</h4>
                    <p>{product.Description}</p>
                    <hr />
                    <p id="product_seller" className="mb-3">Sold by: <strong>{product.Seller}</strong></p>

                    <div className="rating w-50"></div>
                </div>
            </div>
        </div>
    );
}
