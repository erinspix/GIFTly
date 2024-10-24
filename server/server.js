// server/server.js

const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');

const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');
const { authMiddleware } = require('./utils/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// Serve static files from the client build
app.use(express.static(path.join(__dirname, '../client/build')));

// Serve assets (images) from the assets directory
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/giftly_db', {
  
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

// Initialize Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware, // pass context for authentication
});

// Apply Apollo middleware to Express app
(async () => {
    await server.start();
    server.applyMiddleware({ app });

    // Fallback route to serve the React app for any unknown routes
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });

    // Start the server
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`GraphQL endpoint available at http://localhost:${PORT}${server.graphqlPath}`);
    });
})();
