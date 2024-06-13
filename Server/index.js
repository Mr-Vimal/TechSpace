
const mongoose = require('mongoose');
const connectDB = require('./DB/Connect');
// connectDB()




const express = require('express');
const userRoutes = require('./Routes/UserRoutes');
const ProductRoutes = require('./Routes/ProductRoutes');
const PaymentRoutes = require('./Routes/PaymentRoutes');
const cartRoutes = require('./Routes/cartRoutes');
const OrderRoutes = require('./Routes/OrderRoutes');
const MailRoutes = require('./Routes/MailRoutes');


cors = require('cors');
const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json());
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on the port ${PORT}`)
        })
        app.use(express.json());
        app.use('/user', userRoutes)
        app.use('/product', ProductRoutes)
        app.use('/cart', cartRoutes)
        app.use('/payment', PaymentRoutes)
        app.use('/order', OrderRoutes)
        // app.use('/quote', QuoteRoutes)
        app.use('/mail',MailRoutes)
    }
    catch (error) {
        console.log(error)
    }
}
startServer();

app.get('/', (req, res) => {
    res.send("GET Request Called")
})