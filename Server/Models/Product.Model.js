// models/Product.js
const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const schema = new mongoose.Schema({
    ProDetId: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true
    },
    Img: {
        type: String,
        required: true
    },
    ProductName: {
        type: String,
        required: true
    },
    ProductCategory: {
        type: String,
        required: true,
        enum: ['Motherboard', 'Processor', 'Hard Disk', 'SSD', 'RAM', 'Mouse', 'Keyboard', 'Casing', 'Cooler', 'Graphic Card', 'mo'],
        default: 'Motherboard'
    },
    ProductBrand: {
        type: String,
        required: true,
        enum: ['Asus', 'MSI', 'Gigabyte', 'Asrock', 'Biostar', 'Corsair', 'Western Digital', 'Nvidia', 'Logitech', 'Intel', 'Ryzen', 'AMD', 'Western Digital'],
        default: 'Asus'
    },
    ProcessorGen: {
        type: String,
        enum: ['4th Gen', '6th, 7th Gen', '8th, 9th Gen', '10th, 11th Gen', '12th, 13th, 14th Gen', '3rd Gen AMD', ''],
        default: ''
    },
    RAMGen: {
        type: String,
        enum: ['DDR3', 'DDR4', 'DDR5', ''],
        default: ''
    },

    Price: {
        type: Number,
        required: true
    }
});
schema.plugin(AutoIncrement, { inc_field: 'productId' });
const Product = mongoose.model("Product", schema);
module.exports = Product;
