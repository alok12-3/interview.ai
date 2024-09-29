// const express = require('express');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User'); // Adjust the path as necessary
// const router = express.Router();

// // Signup route
// router.post('/signup', async (req, res) => {
//     const { name, email, password } = req.body;

//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = new User({ name, email, password: hashedPassword });
//         await user.save();
        
//         const token = jwt.sign({ id: user._id }, rdtfyguhijihugyft); // Use a secret from .env
//         res.status(201).json({ token, email });
//     } catch (error) {
//         if (error.code === 11000) {
//             return res.status(400).json({ message: 'Email already exists.' });
//         }
//         res.status(500).json({ message: 'Error creating user.' });
//     }
// });

// // Login route
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ message: 'Invalid credentials.' });
//         }

//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//             return res.status(400).json({ message: 'Invalid credentials.' });
//         }

//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); // Use a secret from .env
//         res.status(200).json({ token, email });
//     } catch (error) {
//         res.status(500).json({ message: 'Error logging in.' });
//     }
// });

// module.exports = router;



const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path as necessary
const router = express.Router();

// Define your JWT secret directly
const JWT_SECRET = 'dfcgvhbjnkmljnhbgvfcd'; 

// Signup route
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
         name,
         email,
         password: hashedPassword,
         pdfText: '', // Initialize pdfText with an empty string
         sessions: [], // Initialize sessions with an empty array
     });
        await user.save();
        
        const token = jwt.sign({ id: user._id }, JWT_SECRET); // Use the secret directly
        res.status(201).json({ token, email });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Email already exists.' });
        }
        res.status(500).json({ message: 'Error creating user.' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET); // Use the secret directly
        res.status(200).json({ token, email });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in.' });
    }
});

module.exports = router;
