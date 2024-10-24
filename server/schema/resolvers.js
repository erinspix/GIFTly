// server/schema/resolvers.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Product = require('../models/Product');

const resolvers = {
    Query: {
        // Fetch the authenticated user's data
        me: async (parent, args, context) => {
            if (!context.user) throw new Error('Not authenticated');
            return await User.findById(context.user._id).select('-password');
        },
        // Fetch all users (This could be restricted in a real app)
        users: async () => {
            return await User.find().select('-password');
        },
        // Fetch all products
        products: async () => {
            return await Product.find();
        },
        // Fetch a single product by ID
        product: async (parent, { id }) => {
            return await Product.findById(id);
        },
    },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            // Check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new Error('User already exists with this email');
            }

            // Create the user (password hashing handled in model)
            const user = await User.create({ username, email, password });

            // Generate a JWT token
            const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            // Find the user by email
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error('Incorrect credentials');
            }

            // Compare the password using the model method
            const isMatch = await user.isCorrectPassword(password);
            if (!isMatch) {
                throw new Error('Incorrect credentials');
            }

            // Generate a JWT token
            const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });

            return { token, user };
        },
    },
};

module.exports = resolvers;