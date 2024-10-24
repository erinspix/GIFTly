const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Product = require('../models/Product');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/giftly_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB for cleaning DB');
    // Delete all documents from User and Product collections
    return Promise.all([
        User.deleteMany({}),
        Product.deleteMany({}),
    ]);
})
.then(() => {
    console.log('All users and products have been deleted.');
    mongoose.disconnect();
})
.catch((error) => {
    console.error('Error cleaning the database:', error);
});