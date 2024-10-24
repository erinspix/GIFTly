// server/seeders/seed.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Product = require('../models/Product');

// Load environment variables
dotenv.config();

// import userSeed.json
const users = require('./userSeed.json');


// load productSeed.json
const products = require('./productSeed.json');

// Seed Function
const seedDB = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/giftly_db', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB for seeding');

        // Insert Users
        await User.create(users);
        console.log('Users inserted');

        // Insert Products
        await Product.create(products);
        console.log('Products inserted');

        // Disconnect from MongoDB
        mongoose.disconnect();
        console.log('Database seeding completed and disconnected');
    } catch (error) {
        console.error('Error seeding the database:', error);
    }
};

// Execute the seed function
seedDB();