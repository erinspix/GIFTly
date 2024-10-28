import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { ME_QUERY } from '../graphql/operations';
import {
    Box,
    Flex,
    Spacer,
    Button,
    Text,
    Heading,
    Spinner,
} from '@chakra-ui/react';

const Navbar = () => {
    const navigate = useNavigate();
    
    // Fetch user data to check authentication status
    const { data: userData, loading: userLoading, error: userError } = useQuery(ME_QUERY, {
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
            console.log("User data fetched:", data);
        },
        onError: (err) => {
            console.error("Error fetching user data:", err);
        },
    });

    // If user data is still loading, show spinner
    if (userLoading) return <Spinner size="lg" color="white" />;

    return (
        <Flex bg="#0A3D62" p={4} color="white" alignItems="center" boxShadow="md">
            {/* Home Button */}
            <Box>
                <RouterLink to="/">
                    <Button
                        variant="ghost"
                        color="white"
                        fontWeight="bold"
                        _hover={{ bg: '#0A2A4D' }}
                    >
                        Home
                    </Button>
                </RouterLink>
            </Box>

            {/* Centered GIFTly Title */}
            <Spacer />
            <Box>
                <Heading as="h1" size="lg" color="white" fontWeight="bold" textAlign="center">
                    GIFTly
                </Heading>
            </Box>
            <Spacer />

            {/* Login/Register or User Info */}
            <Box>
                {userError ? (
                    <Text color="red.500">Error loading user data</Text>
                ) : userData?.me ? (
                    <Flex alignItems="center">
                        <Text mr={4}>Hello, {userData.me.username}</Text>
                        <Button colorScheme="teal" onClick={() => {
                            console.log("Logging out...");
                            localStorage.removeItem('id_token');
                            window.location.reload();
                        }}>
                            Logout
                        </Button>
                    </Flex>
                ) : (
                    <Flex>
                        <RouterLink to="/login">
                            <Button variant="ghost" color="white" mr={4}>
                                Login
                            </Button>
                        </RouterLink>
                        <RouterLink to="/register">
                            <Button colorScheme="teal">Register</Button>
                        </RouterLink>
                    </Flex>
                )}
            </Box>
        </Flex>
    );
};

export default Navbar;
