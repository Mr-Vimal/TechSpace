const mongoose =require('mongoose')
require('dotenv').config();


const connectDB =async () => {
    try{
        await mongoose.connect(process.env.CONNECTION_VARIABLE);
        console.log("Connected to MongoDB");
    } catch(error){
        console.log("Error Connecting to MongoDB",error);
    }
}

module.exports =connectDB;


// mongoose.connect('mongodb://localhost:27017/ecommerce', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });



