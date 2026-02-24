require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

mongoose.connect(process.env.MONGO_URI).then(async () => {
    console.log('Connected to MongoDB');
    try {
        const user = await User.findOne({ email: 'saadharoon6800@gmail.com' });
        if (user) {
            console.log('User found in DB:', user.name);
            const isMatch = await bcrypt.compare('Saadharoon0?', user.password);
            console.log('Password match with "Saadharoon0?":', isMatch);
        } else {
            console.log('User not found in DB');
        }
    } catch (e) {
        console.error('Error details:', e);
    }
    process.exit(0);
}).catch(e => console.error('Connection error:', e));
