import { gql } from '@apollo/client';

// Mutation to register a new user
export const ADD_USER = gql`
    mutation AddUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
                email
                createdAt
            }
        }
    }
`;

// Mutation to login a user
export const LOGIN_USER = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
                email
                createdAt
            }
        }
    }
`;

// Query to fetch authenticated user's data
export const ME_QUERY = gql`
    query Me {
        me {
            _id
            username
            email
            createdAt
        }
    }
`;

// Query to fetch all products
export const PRODUCTS_QUERY = gql`
    query Products {
        products {
            _id
            name
            price
            craftsman
            location
            imageUrl
            createdAt
        }
    }
`;