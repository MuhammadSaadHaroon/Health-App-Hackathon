const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Record = require('../models/Record');

// Get All Records
router.get('/', auth, async (req, res) => {
    try {
        const records = await Record.find({ userId: req.user.id }).sort({ date: -1 });
        res.json(records);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Upload Record
router.post('/upload', auth, async (req, res) => {
    try {
        const { title, category, fileUrl } = req.body;
        const newRecord = new Record({
            userId: req.user.id,
            title,
            category,
            fileUrl
        });
        await newRecord.save();
        res.status(201).json(newRecord);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
