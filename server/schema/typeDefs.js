const typeDefs = `
    type User {
        _id: ID
        username: String
        email: String
        collections: [Collection]
    }

    type Collection {
        _id: ID
        name: String
        description: String
        user: User
    }

    type Query {
        allUsers: [User]
        findUser(email: String): User
    }

    type Mutation {
        login(email: String, password: String): User
    }
`;


module.exports = typeDefs;