require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI).then(async () => {
    console.log('Connected to MongoDB');
    try {
        const users = await User.find({}, 'name email phone -_id').lean();
        console.log(`\n========================================`);
        console.log(` Total Users Signed Up: ${users.length}`);
        console.log(`========================================\n`);
        console.table(users);
    } catch (e) {
        console.error('Error fetching users:', e);
    }
    process.exit(0);
}).catch(e => console.error('Connection error:', e));
