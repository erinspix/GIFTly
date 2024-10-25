// client/src/components/Register.js

import React, { useState } from 'react';
import { useMutation, useApolloClient } from '@apollo/client';
import { ADD_USER } from '../graphql/operations';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Heading,
    VStack,
    Text,
} from '@chakra-ui/react';

const Register = () => {
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();
    const client = useApolloClient();

    const [addUser, { error }] = useMutation(ADD_USER, {
        onCompleted: (data) => {
            const { token } = data.addUser;
            localStorage.setItem('id_token', token);
            client.resetStore(); // Refetch active queries, including ME_QUERY
            navigate('/'); // Redirect to homepage after registration
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addUser({
                variables: { ...formState },
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Box maxW="md" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="lg">
            <Heading mb={6} textAlign="center">Register</Heading>
            <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                    <FormControl id="username" isRequired>
                        <FormLabel>Username</FormLabel>
                        <Input 
                            type="text" 
                            name="username" 
                            value={formState.username} 
                            onChange={handleChange} 
                        />
                    </FormControl>
                    <FormControl id="email" isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input 
                            type="email" 
                            name="email" 
                            value={formState.email} 
                            onChange={handleChange} 
                        />
                    </FormControl>
                    <FormControl id="password" isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input 
                            type="password" 
                            name="password" 
                            value={formState.password} 
                            onChange={handleChange} 
                        />
                    </FormControl>
                    <Button colorScheme="teal" type="submit" width="full">Register</Button>
                    {error && <Text color="red.500">Registration Failed: {error.message}</Text>}
                </VStack>
            </form>
        </Box>
    );
};

export default Register;