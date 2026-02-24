const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Appointment = require('../models/Appointment');

// Book Appointment
router.post('/book', auth, async (req, res) => {
    try {
        const { doctorName, date, time } = req.body;

        // Clash check
        const existingAppointment = await Appointment.findOne({ doctorName, date, time });
        if (existingAppointment) {
            return res.status(400).json({ message: 'Slot already booked for this doctor' });
        }

        const newAppointment = new Appointment({
            userId: req.user.id,
            doctorName,
            date,
            time,
            status: 'Confirmed'
        });

        await newAppointment.save();
        res.status(201).json(newAppointment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get Booked Slots for a specific doctor and date
router.get('/booked-slots', auth, async (req, res) => {
    try {
        const { doctorName, date } = req.query;
        if (!doctorName || !date) {
            return res.status(400).json({ message: 'Missing doctorName or date' });
        }

        const appointments = await Appointment.find({ doctorName, date });
        const bookedTimes = appointments.map(app => app.time);

        res.json(bookedTimes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get Upcoming Appointments
router.get('/upcoming', auth, async (req, res) => {
    try {
        const today = new Date().toISOString().split('T')[0];
        const appointments = await Appointment.find({
            userId: req.user.id,
            date: { $gte: today }
        }).sort({ date: 1, time: 1 });
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get History
router.get('/history', auth, async (req, res) => {
    try {
        const today = new Date().toISOString().split('T')[0];
        const appointments = await Appointment.find({
            userId: req.user.id,
            date: { $lt: today }
        }).sort({ date: -1, time: -1 });
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
