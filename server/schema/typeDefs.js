const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        createdAt: String!
        # Add fields like cart or orders if needed
    }

    type Product {
        _id: ID!
        name: String!
        price: Float!
        craftsman: String!
        location: String!
        imageUrl: String!
        createdAt: String!
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        users: [User]
        products: [Product]
        product(id: ID!): Product
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        # Additional mutations like addToCart, removeFromCart can be added
    }
`;

module.exports = typeDefs;
