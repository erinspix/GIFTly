const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const apiRoutes = require('./server/routes/api');
require('dotenv').config();

const connectDB = require('./server/config/db');
connectDB();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('/api', apiRoutes);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/giftly_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
