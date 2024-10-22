const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());


app.use(express.static(path.join(__dirname, '../client')));

app.use('/assets', express.static('assets'));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/giftly_db', {})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
    });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
