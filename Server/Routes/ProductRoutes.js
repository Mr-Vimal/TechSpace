const express = require('express');
const router = express.Router();
const productController = require('../Controllers/Product.Controller');
// Routes using controller functions
router.get('/getProduct', productController.getProduct);
router.post('/createProduct', productController.createProduct);
router.put('/update/:id', productController.updateProduct);
router.delete('/delete/:id', productController.deleteProduct);
router.get('/getCategory/', productController.getAllCategories);
router.post('/getPayment', productController.getPayment);
router.get('/find', productController.findProduct);


module.exports = router;






































