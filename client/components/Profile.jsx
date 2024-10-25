import React from 'react';
import { useQuery } from '@apollo/client';
import { ME_QUERY } from '../graphql/operations';
import { Navigate } from 'react-router-dom';
import {
    Box,
    Heading,
    Text,
    VStack,
    Spinner,
} from '@chakra-ui/react';

const Profile = () => {
    const { loading, error, data } = useQuery(ME_QUERY, {
        fetchPolicy: 'cache-and-network', // Ensures fresh data
    });

    if (loading) return <Spinner size="xl" />;
    if (error) return <Text color="red.500">Error fetching profile</Text>;

    if (!data.me) {
        // If not authenticated, redirect to login
        return <Navigate to="/login" />;
    }

    return (
        <Box maxW="md" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="lg">
            <VStack spacing={4} align="start">
                <Heading size="md">Profile</Heading>
                <Text><strong>Username:</strong> {data.me.username}</Text>
                <Text><strong>Email:</strong> {data.me.email}</Text>
                <Text><strong>Member Since:</strong> {new Date(data.me.createdAt).toLocaleDateString()}</Text>
            </VStack>
        </Box>
    );
};

export default Profile;