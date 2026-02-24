const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Signup
router.post('/signup', async (req, res) => {
    try {
        console.log('Signup Attempt:', req.body);
        const { name, email, password, phone } = req.body;
        let user = await User.findOne({ email });
        console.log('Existing User Found:', user ? 'Yes' : 'No');
        if (user) return res.status(400).json({ message: 'User already exists' });

        user = new User({ name, email, password, phone });
        await user.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.error('Signup Error:', err);
        res.status(500).json({ message: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid Credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone
            }
        });
    } catch (err) {
        console.error('Login Error:', err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
