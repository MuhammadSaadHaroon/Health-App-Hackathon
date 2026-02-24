const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: Date, default: Date.now },
    fileUrl: { type: String }, // Base64 or URL
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Record', recordSchema);
