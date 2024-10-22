// server/config/db.js

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Debugging: Log the MongoDB URI
        console.log('MongoDB URI:', process.env.MONGODB_URI);
        
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
