import React, { useState } from 'react';
import { useMutation, useApolloClient } from '@apollo/client';
import { LOGIN_USER, ME_QUERY } from '../graphql/operations';
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

const Login = () => {
    const [formState, setFormState] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();
    const client = useApolloClient();

    const [login, { error }] = useMutation(LOGIN_USER, {
        onCompleted: async (data) => {
            const { token } = data.login;
            localStorage.setItem('id_token', token);
            
            // Refetch the ME_QUERY to update the cache with the new user data
            await client.refetchQueries({
                include: [ME_QUERY],
            });
            
            navigate('/');
        },
        onError: (error) => {
            console.error('Login error:', error);
        }
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
            await login({
                variables: { ...formState },
            });
        } catch (err) {
            console.error('Login submission error:', err);
        }
    };

    return (
        <Box maxW="md" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="lg">
            <Heading mb={6} textAlign="center">Login</Heading>
            <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
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
                    <Button colorScheme="teal" type="submit" width="full">Login</Button>
                    {error && <Text color="red.500">Login Failed: {error.message}</Text>}
                </VStack>
            </form>
        </Box>
    );
};

export default Login;
