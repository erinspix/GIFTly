const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const User = require('../models/User');
const Product = require('../models/Product');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (!context.user) throw new Error('Not authenticated');
            return await User.findById(context.user._id).select('-password');
        },
        users: async () => {
            return await User.find().select('-password');
        },
        products: async () => {
            return await Product.find();
        },
        product: async (parent, { id }) => {
            return await Product.findById(id);
        },
        // New resolver to fetch a random product
        randomProduct: async () => {
            const count = await Product.countDocuments(); // Get total number of products
            const randomIndex = Math.floor(Math.random() * count); // Generate a random index
            const randomProduct = await Product.findOne().skip(randomIndex); // Find product at random index
            return randomProduct;
        },
    },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new Error('User already exists with this email');
            }

            const user = await User.create({ username, email, password });
            const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error('Incorrect credentials');
            }

            const isMatch = await user.isCorrectPassword(password);
            if (!isMatch) {
                throw new Error('Incorrect credentials');
            }

            const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });

            return { token, user };
        },
    },
};

module.exports = resolvers;
