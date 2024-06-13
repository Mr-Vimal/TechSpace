import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Product.css';

export default function AddProduct({ setShowForm, onSubmit, editProduct }) {
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [ProductCategory, setProductCategory] = useState('');
    const [ProductName, setProductName] = useState('');
    const [ProductBrand, setProductBrand] = useState('');
    const [ProcessorGen, setProcessorGen] = useState('');
    const [RAMGen, setRAMGen] = useState('');
    const [Price, setPrice] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        if (editProduct) {
            setImageUrl(editProduct.Img);
            setProductName(editProduct.ProductName);
            setProductBrand(editProduct.ProductBrand);
            setProductCategory(editProduct.ProductCategory);
            setProcessorGen(editProduct.ProcessorGen)
            setRAMGen(editProduct.RAMGen)
            setPrice(editProduct.Price);
        }
    }, [editProduct]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageFile(file);
            setImageUrl(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        if (imageFile) {
            formData.append('Img', imageFile);
        }
        formData.append('ProductName', ProductName);
        formData.append('ProductBrand', ProductBrand);
        formData.append('ProductCategory', ProductCategory);
        formData.append('ProcessorGen', ProcessorGen);
        formData.append('RAMGen', RAMGen);
        formData.append('Price', Price);

        try {
            if (editProduct) {
                await axios.put(`https://techspace-xdcd.onrender.com/product/update/${editProduct._id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                onSubmit({ ...editProduct, Img: imageUrl, ProductName, ProductBrand, ProductCategory, Price });
            } else {
                const response = await axios.post('https://techspace-xdcd.onrender.com/product/createProduct', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                const productData = response.data;
                productData.Img = imageUrl;
                onSubmit(productData);
            }
            setShowForm(false); // Close the form after submission
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while processing your request. Please try again later.');
        }
    };

    const handleCancel = () => {
        setImageFile(null);
        setImageUrl('');
        setProductName('');
        setProductBrand('');
        setProductCategory('');
        setProcessorGen('');
        setRAMGen('');
        setPrice('');
        setError('');
        setShowForm(false);
    };

    return (
        <div className='form'>
            <div className='App2'>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="img">Image</label>
                    <input type="file" id="img" onChange={handleImageChange} />
                    {imageUrl && <img src={imageUrl} alt="Product" className='pro-img' />}

                    <label htmlFor="productCategory">Product Category</label>
                    <select id="productCategory" value={ProductCategory} onChange={(e) => setProductCategory(e.target.value)}>
                        <option value="">Select Category</option>
                        <option value="Motherboard">Motherboard</option>
                        <option value="Processor">Processor</option>
                        <option value="Hard Disk">Hard Disk</option>
                        <option value="SSD">SSD</option>
                        <option value="RAM">RAM</option>
                        <option value="Casing">Casing</option>
                        <option value="Cooler">Cooler</option>
                        <option value="Graphic Card">Graphic Card</option>
                    </select>

                    <label htmlFor="productBrand">Product Brand</label>
                    <select id="productBrand" value={ProductBrand} onChange={(e) => setProductBrand(e.target.value)}>
                        <option value="">Select Brand</option>
                        <option value="Asus">Asus</option>
                        <option value="MSI">MSI</option>
                        <option value="Gigabyte">Gigabyte</option>
                        <option value="Asrock">Asrock</option>
                        <option value="Biostar">Biostar</option>
                        <option value="Corsair">Corsair</option>
                        <option value="Western Digital">Western Digital</option>
                        <option value="Nvidia">Nvidia</option>
                        <option value="Logitech">Logitech</option>
                        <option value="Intel">Intel</option>
                        <option value="Ryzen">Ryzen</option>
                        <option value="AMD">AMD</option>
                        <option value="Western Digital">Western Digital</option>
                    </select>
                    <label htmlFor="ProcessorGen">Processor Gen</label>
                    <select id="ProcessorGen" value={ProcessorGen} onChange={(e) => setProcessorGen(e.target.value)}>
                        <option value="">Select Brand</option>
                        <option value="4th Gen">4th Gen</option>
                        <option value="6th,7th Gen">6th, 7th Gen</option>
                        <option value="8th, 9th Gen">8th, 9th Gen</option>
                        <option value="10th, 11th Gen">10th, 11th Gen</option>
                        <option value="12th, 13th, 14th Gen">12th, 13th, 14th Gen</option>
                        <option value="3rd Gen ">3rd Gen AMD</option>
                    </select>

                    <label htmlFor="RAMGen">RAM Gen</label>
                    <select id="RAMGen" value={RAMGen} onChange={(e) => setRAMGen(e.target.value)}>
                        <option value="">Select Brand</option>
                        <option value="DDR3">DDR3</option>
                        <option value="DDR4">DDR4</option>
                        <option value="DDR5">DDR5</option>
                    </select>


                    <label htmlFor="ProductName">Product Name</label>
                    <input type="text" id="ProductName" placeholder="Enter Product Name" value={ProductName} onChange={(e) => setProductName(e.target.value)} />

                    <label htmlFor="price">Price</label>
                    <input type="number" id="price" placeholder="Enter Product Price" value={Price} onChange={(e) => setPrice(e.target.value)} />

                    <br />
                    <button type="submit">{editProduct ? 'Update' : 'Add'} Product</button>
                    <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
                </form>
                {error && <div>Error: {error}</div>}
            </div>
        </div>
    );
}
