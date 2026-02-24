const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Get Profile
router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update Profile
router.put('/update', auth, async (req, res) => {
    try {
        const { name, phone, profilePic } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { name, phone, profilePic },
            { new: true }
        ).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
