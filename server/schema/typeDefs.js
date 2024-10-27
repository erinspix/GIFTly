const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        createdAt: String!
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
        randomProduct: Product # New query for a random product
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;
