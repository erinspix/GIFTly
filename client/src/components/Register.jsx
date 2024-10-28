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

import './register.css'; // Import the new CSS file

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
            console.error('Registration submission error:', err);
        }
    };

    return (
        <Box className="register-container" maxW="md" mx="auto" mt={8}>
            <Heading className="register-heading">Register</Heading>
            <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                    <FormControl id="username" isRequired>
                        <FormLabel>Username</FormLabel>
                        <Input 
                            type="text" 
                            name="username" 
                            value={formState.username} 
                            onChange={handleChange} 
                            className="register-input"
                        />
                    </FormControl>
                    <FormControl id="email" isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input 
                            type="email" 
                            name="email" 
                            value={formState.email} 
                            onChange={handleChange} 
                            className="register-input"
                        />
                    </FormControl>
                    <FormControl id="password" isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input 
                            type="password" 
                            name="password" 
                            value={formState.password} 
                            onChange={handleChange} 
                            className="register-input"
                        />
                    </FormControl>
                    <Button 
                        type="submit" 
                        width="full" 
                        className="register-button"
                    >
                        Register
                    </Button>
                    {error && <Text className="register-error">Registration Failed: {error.message}</Text>}
                </VStack>
            </form>
        </Box>
    );
};

export default Register;
