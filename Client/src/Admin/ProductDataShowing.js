import React, { useState, useEffect } from "react";
import axios from 'axios';
import Admin from "./Admin";
import './ProductDataShowing.css'
import AddProduct from "./Product"; // Import AddProduct component

export default function DataShowing() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editProduct, setEditProduct] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3002/product/getProduct');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('An error occurred while fetching products. Please try again later.');
            }
        };

        fetchData();
    }, []);

    const handleAddProduct = () => {
        setEditProduct(null);
        setShowForm(true); // Show the form
    };

    const handleEditProduct = (product) => {
        setEditProduct(product);
        setShowForm(true);
    };

    const handleDeleteProduct = async (_id) => {
        try {
            await axios.delete(`http://localhost:3002/product/delete/${_id}`);
            setProducts(products.filter(product => product._id !== _id));
        } catch (error) {
            console.error('Error deleting product:', error);
            setError('An error occurred while deleting the product. Please try again later.');
        }
    };

    const handleFormSubmit = (updatedProduct) => {
        if (editProduct) {
            // Update product
            setProducts(products.map(product => product._id === updatedProduct._id ? updatedProduct : product));
        } else {
            // Add new product
            setProducts([...products, updatedProduct]);
        }
        setShowForm(false);
    };

    return (
        <div>
            <div className="admin-dashboard">
                <div className="dashboard-flex">
                    <Admin />
                </div>
                <div className="product-table">
                    {/* <button className="add-product-button" onClick={handleAddProduct}>Add Product</button> */}
                    {error ? (
                        <div>Error: {error}</div>
                    ) : (
                        <table className="product-details">
                            <thead>
                                <tr>
                                    <th>Product Image</th>
                                    <th>Product ID</th>
                                    <th>Product Category</th>
                                    <th>Product Brand</th>
                                    <th>RAM Gen</th>
                                    <th>Processor Gen</th>
                                    <th>Product Name</th>
                                    <th> Price</th>
                                    <th> <button className="add" onClick={handleAddProduct}>Add Product</button></th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product._id}>
                                        <td className="admin-td" ><img src={product.Img} alt={product.ProductName} className="product-image" /></td>
                                        <td className="admin-td" >{product.productId}</td>
                                        <td className="admin-td" >{product.ProductCategory}</td>
                                        <td className="admin-td" >{product.ProductBrand}</td>
                                        <td className="admin-td" >{product.RAMGen}</td>
                                        <td className="admin-td" >{product.ProcessorGen}</td>
                                        <td className="admin-td" >{product.ProductName}</td>
                                        <td className="admin-td" >{product.Price}</td>
                                        <td className="admin-td" >
                                            <button className="edit" onClick={() => handleEditProduct(product)}>Edit</button>
                                            <button type="button" className="delete" onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
            {showForm && <AddProduct setShowForm={setShowForm} onSubmit={handleFormSubmit} editProduct={editProduct} />}
        </div>
    );
}
