const express = require('express');
const router = express.Router();
const userController = require('../Controllers/User.Controller');
// Routes using controller functions
router.get('/', userController.getUser);
router.post('/create', userController.createUser);
router.post('/login',userController.loginUser)
// router.post('/login', userController.userLogin);
router.put('/update/:id', userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;