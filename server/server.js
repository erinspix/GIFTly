require('dotenv').config(); // Load .env variables at the top

const express = require('express');
const path = require('path');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { authMiddleware } = require('./utils/auth');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Initialize Stripe

// Debugging line to check if Stripe key is loaded
console.log('Stripe Secret Key:', process.env.STRIPE_SECRET_KEY);

const { typeDefs, resolvers } = require('./schema');
const db = require('./config/db');

const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  
  // Middleware to parse URL-encoded and JSON request bodies
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Serve static images
  app.use('/images', express.static(path.join(__dirname, '../client/images')));

  // Stripe PaymentIntent route
  app.post('/api/create-payment-intent', async (req, res) => {
    const { amount } = req.body;

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
      });

      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // GraphQL middleware
  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware,
  }));

  // Serve static assets in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  // Connect to the database and start the server
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the async function to start the server
startApolloServer();
