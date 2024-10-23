const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');
const db = require("./config/db")

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
    
    db.once('open', () => {
        app.listen(PORT, () => {
          console.log(`API server running on port ${PORT}!`);
          console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
        });
      });
    
    
    /*
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/public/index.html'));
    });
    */
    
}


startApolloServer();