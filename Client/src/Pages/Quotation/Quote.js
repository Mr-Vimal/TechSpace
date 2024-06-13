import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './Quote.css';
import Navbar from '../../Components/Navbar/Navbar';

export default function Dropdown() {
    const location = useLocation();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [selections, setSelections] = useState(loadFromLocalStorage('selections') || []);
    const [tableData, setTableData] = useState(loadFromLocalStorage('tableData') || []);
    const [selectedModelDetails, setSelectedModelDetails] = useState(null);
    const requiredCategories = ['Motherboard', 'Processor', 'RAM', 'Hard Disk', 'Casing', 'Cooler'];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3002/product/getProduct');
                setProducts(response.data);
                const categories = [...new Set(response.data.map(product => product.ProductCategory))];
                setCategories(categories);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        if (location.state && location.state.product) {
            const selectedProduct = location.state.product;
            addToQuoteTable(selectedProduct);
        }
    }, [location.state]);

    useEffect(() => {
        if (tableData.length > 0) {
            saveToLocalStorage('tableData', tableData);
        }
    }, [tableData]);

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);
        setSelectedBrand('');
        setSelectedModel('');
        setModels([]);
        const brands = products
            .filter(product => product.ProductCategory === category)
            .map(product => product.ProductBrand);
        setBrands([...new Set(brands)]);
    };

    const handleBrandChange = (e) => {
        const brand = e.target.value;
        setSelectedBrand(brand);
        setSelectedModel('');
        const models = products
            .filter(product => product.ProductCategory === selectedCategory && product.ProductBrand === brand)
            .map(product => product.ProductName);
        setModels([...new Set(models)]);
    };

    const handleModelChange = (e) => {
        const model = e.target.value;
        setSelectedModel(model);

        if (selectedCategory && selectedBrand && model) {
            const selectedProduct = products.find(product =>
                product.ProductCategory === selectedCategory &&
                product.ProductBrand === selectedBrand &&
                product.ProductName === model
            );
            setSelectedModelDetails(selectedProduct);
        } else {
            setSelectedModelDetails(null);
        }
    };

    const handleAddSelection = () => {
        if (!selectedCategory || !selectedBrand || !selectedModel) {
            alert('Please select a product.');
            return;
        }

        const selectedProduct = products.find(product =>
            product.ProductCategory === selectedCategory &&
            product.ProductBrand === selectedBrand &&
            product.ProductName === selectedModel
        );

        if (selectedProduct) {
            const existingProductIndex = tableData.findIndex(item =>
                item.category === selectedCategory &&
                item.brand === selectedBrand &&
                item.model === selectedModel
            );

            if (existingProductIndex !== -1) {
                handleIncrement(existingProductIndex);
            } else {
                addToQuoteTable(selectedProduct);
            }
        }
    };

    const addToQuoteTable = (product) => {
        const newSelection = {
            category: product.ProductCategory,
            brand: product.ProductBrand,
            model: product.ProductName,
            price: product.Price,
            quantity: 1,
            img: product.Img
        };
        setSelections([...selections, newSelection]);
        setTableData([...tableData, newSelection]);
        saveToLocalStorage('selections', [...selections, newSelection]);
        saveToLocalStorage('tableData', [...tableData, newSelection]);
    };

    const handleIncrement = (index) => {
        const newTableData = [...tableData];
        newTableData[index].quantity++;
        setTableData(newTableData);
        saveToLocalStorage('tableData', newTableData);
    };

    const handleDecrement = (index) => {
        const newTableData = [...tableData];
        if (newTableData[index].quantity > 1) {
            newTableData[index].quantity--;
            setTableData(newTableData);
            saveToLocalStorage('tableData', newTableData);
        }
    };

    const handleRemove = (index) => {
        const newSelections = selections.filter((_, i) => i !== index);
        const newTableData = tableData.filter((_, i) => i !== index);
        setSelections(newSelections);
        setTableData(newTableData);
        saveToLocalStorage('selections', newSelections);
        saveToLocalStorage('tableData', newTableData);
    };

    const handleClearAll = () => {
        setSelections([]);
        setTableData([]);
        localStorage.removeItem('selections');
        localStorage.removeItem('tableData');
    };

    const handlePrint = () => {
        if (!hasRequiredComponents()) {
            alert('Please add all required components (Motherboard, Processor, RAM, Hard Disk, Casing, Cooler) to the quote.');
            return;
        }
        if (tableData.length === 0) {
            alert('Nothing added in quote. Please add items to the quote.');
        } else {
            window.print();
        }
    };

    const hasRequiredComponents = () => {
        const categoriesInQuote = tableData.map(item => item.category);
        return requiredCategories.every(category => categoriesInQuote.includes(category));
    };

    const handleCheckout = () => {
        const isAuthenticated = checkUserAuthentication();
        if (!hasRequiredComponents()) {
            alert('Please add all required components (Motherboard, Processor, RAM, Hard Disk, Casing, Cooler) to the quote.');
        } else if (isAuthenticated) {
            navigate('/checkout', { state: { totalAmount: calculateTotal() } });
        } else {
            navigate('/login', { state: { from: location.pathname } });
        }
    };

    const checkUserAuthentication = () => {
        // Assuming you store a token or user info in localStorage after user login
        const token = localStorage.getItem('token');
        return !!token;
    };

    const calculateTotal = () => {
        if (!tableData) {
            return 0;
        }

        let total = 0;
        tableData.forEach(item => {
            total += item.price * item.quantity;
        });
        return total;
    };

    const totalProductsCount = tableData.reduce((acc, curr) => acc + curr.quantity, 0);
    const totalAmount = calculateTotal();





    return (
        <div>
            <div className='main'>
                <div className='vimal-quote'>
                    <div className='vimal-quote-1'>
                        <div className="dropdown-container">
                            <div className='dropdown-box'>
                                <label htmlFor="category" className='quote-label'>Category:</label>
                                <select id="category" className='selectcat' value={selectedCategory} onChange={handleCategoryChange}>
                                    <option className='opt-class' value="">Select Category</option>
                                    {categories.map(category => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>

                                <label htmlFor="brand" className='quote-label'>Brand:</label>
                                <select id="brand" className='selectcat' value={selectedBrand} onChange={handleBrandChange} disabled={!selectedCategory}>
                                    <option className='opt-class' value="">Select Brand</option>
                                    {brands.map(brand => (
                                        <option key={brand} value={brand}>
                                            {brand}
                                        </option>
                                    ))}
                                </select>

                                <label htmlFor="model" className='quote-label'>Model:</label>
                                <select id="model" className='selectcat' value={selectedModel} onChange={handleModelChange} disabled={!selectedBrand}>
                                    <option className='opt-class' value="">Select Model</option>
                                    {models.map(model => (
                                        <option key={model} value={model}>
                                            {model}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button className='quote-add-btn' onClick={handleAddSelection} disabled={!selectedModel}>Add</button>
                        </div>

                        {selectedModelDetails && (
                            <div className='selected-model-show'>
                                <p className='select-product'>Selected Models:</p>
                                <p>{selectedModelDetails.ProductBrand}</p>
                                <p>${selectedModelDetails.Price}</p>
                            </div>
                        )}

                        <div>
                            <table className='quote-show-table'>
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Brand</th>
                                        <th>Model</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total Price</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableData.map((item, index) => (
                                        <tr key={index}>
                                            <td className='quote-td'><img src={item.img} alt={item.model} className='image-img' /></td>
                                            <td className='quote-td'>{item.brand}</td>
                                            <td className='quote-td'>{item.model}</td>
                                            <td className='quote-td'>${item.price}</td>
                                            <td>
                                                <button onClick={() => handleDecrement(index)}>-</button>
                                                {item.quantity}
                                                <button onClick={() => handleIncrement(index)}>+</button>
                                            </td>
                                            <td>${item.price * item.quantity}</td>
                                            <td>
                                                <button onClick={() => handleRemove(index)}>Remove</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button className='quote-clear-btn' onClick={handleClearAll} style={{ float: 'right' }}>Clear All</button>
                        </div>
                        <div className='quote-btns'>
                            <button className='download-quotation-btn' onClick={handlePrint}>Download Quotation</button>
                            <button className='checkout-btn' onClick={handleCheckout}>Proceed to Checkout</button>
                            {/* <button className='mail-btn' onClick={handleSendEmail} >Mail</button> */}
                        </div>
                    </div>
                </div>
                <div className='total-details'>
                    <p>Total Products Count: {totalProductsCount}</p>
                    <p>Total Amount: ${totalAmount}</p>
                </div>
            </div>
        </div>
    );
}

const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

const loadFromLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
};
