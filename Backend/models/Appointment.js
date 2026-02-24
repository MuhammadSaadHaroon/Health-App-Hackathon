const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    doctorName: { type: String, required: true },
    date: { type: String, required: true }, // Format: YYYY-MM-DD
    time: { type: String, required: true }, // Format: HH:mm
    status: { type: String, enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'], default: 'Pending' },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Appointment', appointmentSchema);
