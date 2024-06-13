const express = require('express');
const mongoose = require('mongoose');
const User = require('../Models/User.model');
const app = express();
app.use(express.json());
const { hashGenerate } = require('../Routes/Auth'); // Fix the import statement
const { hashValidator } = require('../Routes/Auth')
const jwt = require('jsonwebtoken')
// Define your controller functions
const getUser = (req, res) => {
    // Logic to get all users
    User.find({})
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({ message: 'Something went wrong' });
        });
};

const createUser = async (req, res) => {
    try {
        // Generate hash for the password
        const hashPassword = await hashGenerate(req.body.Password);

        // Create a new user object
        const user = new User({
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            DateOfBirth: req.body.DateOfBirth,
            Email: req.body.Email,
            PhoneNumber: req.body.PhoneNumber,
            Password: hashPassword,
        });

        // Save the user to the database
        await user.save();

        // Send success response
        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        // Log the error for debugging
        console.error('Error creating user:', error);

        // Send error response
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

// const createUser = (req, res) => {
//     const user = new User(req.body);
//     user.save().then(() => res.status(201).json({ message: 'User created successfully' })).catch(err => res.status(500).json({ message: 'Something went wrong' }));
// };

const updateUser = (req, res) => {
    // Logic to update user
    const id = req.params.id;
    const { name, email, password } = req.body
};


const deleteUser = (req, res) => {
    // Logic to delete user
    const id = req.params.id;
    User.findByIdAndRemove(id, (err, user) => {
        if (err) {
            res.status(500).json({ message: 'Something went wrong' });
        } else if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.status(200).json(user);
        }
    });
};


//User Login 

const loginUser = async (req, res) => {
    try {
        const existingUser = await User.findOne({ Email: req.body.Email });
        if (!existingUser) {
            return res.status(400).send("Email is Invalid");
        }

        const checkUser = await hashValidator(req.body.Password, existingUser.Password);
        if (!checkUser) {
            return res.status(400).send("Password is Invalid");
        }

        // Generate JWT token with user's email
        const token = jwt.sign({ email: existingUser.Email }, 'JWT_KEY', { expiresIn: '24h' });

        // Include user's name and role in the response
        const role = existingUser.role;
        const name = existingUser.LastName; // Assuming the user model has a 'name' field

        res.json({ token, role, name });
    } catch (error) {
        res.status(500).send(error.message);
    }
};


// const userLogin= async (req, res) => {
//     const { email, password } = req.body;

//     try {
//       // Find the user in the database
//       const user = await User.findOne({ email });

//       if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//       }

//       // Compare passwords
//       const match = await bcrypt.compare(password, user.passwordHash);

//       if (match) {
//         // Generate JWT token
//         const token = jwt.sign({ email: user.email, role: user.role }, 'Vimal', { expiresIn: '24h' });
//         res.json({ token });
//       } else {
//         res.status(401).json({ error: 'Invalid credentials' });
//       }
//     } catch (error) {
//       console.error(error); // Log the error for debugging
//       res.status(500).json({ error: 'An error occurred' });
//     }
//   };

// // Export your controller functions
module.exports = {
    getUser,
    createUser,
    loginUser,
    updateUser,
    deleteUser
    // userLogin
};






