const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const checkFormSchema = new Schema({
    
    fullName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required:true
    },
    postalCode:{
        type:Number,                                                                                                        
        required:true
    }
});
const Order = mongoose.model('OrderDetails', checkFormSchema);
module.exports = Order;