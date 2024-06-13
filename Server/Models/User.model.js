const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true
    },
    LastName:{
        type: String,
        required: true
    },

    Email:{
        type: String,
        unique :true
    },
    PhoneNumber:{
        type:Number,
        required:true
    },
    role: {
        type: String,
        enum: ['admin', 'user'], // Possible roles
        default: 'user' // Default role
    },
    Password:{
        type: String,
        required: true
    }
});

const Document = mongoose.model("user", schema);
module.exports = Document;
