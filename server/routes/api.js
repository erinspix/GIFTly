// server/routes/api.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Item = require('../models/Item');
const authMiddleware = require('../middleware/authMiddleware');

// Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: "User not found" });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: "Invalid password" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all items
router.get('/items', authMiddleware, async (req, res) => {
    try {
        const items = await Item.find({ user: req.user.id });
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add a new item
router.post('/items', authMiddleware, async (req, res) => {
    try {
        const { name, description, price, imageUrl } = req.body;
        const newItem = new Item({
            name,
            description,
            price,
            imageUrl,
            user: req.user.id
        });

        const item = await newItem.save();
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
