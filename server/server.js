const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');


const app = express();
const PORT = process.env.PORT || 3001;
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
});


const startApolloServer = async () => {
    await server.start();

    app.use(express.urlencoded({ extended: false}));
    app.use(express.json());
    // This REDEFINEs the INCOMING REQUEST
    app.use('/graphql', expressMiddleware(server));  // WE ONLY HAVE 'POST' HTTP METHOD with an endpoint of '/graphql'
    
    
    if(process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/dist')));

        app.get('*', (req, res) => {

            res.sendFile(path.join(__dirname, '../client/dist/index.html'))
        });
        
    }
    
    app.use('/assets', express.static('assets'));
    
    // Connect to MongoDB
    mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/giftly_db', {})
        .then(() => {
            console.log('Connected to MongoDB');
            app.listen(PORT, () => {
                console.log(`Server running on port ${PORT}`);
            });
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB:', error);
        });
    
    /*
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/public/index.html'));
    });
    */
    
}


startApolloServer();