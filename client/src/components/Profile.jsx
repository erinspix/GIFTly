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

import './profile.css'; // Import the CSS file

const Profile = () => {
    const { loading, error, data } = useQuery(ME_QUERY, {
        fetchPolicy: 'cache-and-network', // Ensures fresh data
    });

    if (loading) return <Spinner size="xl" className="spinner" />;
    if (error) return <Text color="red.500">Error fetching profile</Text>;

    if (!data.me) {
        // If not authenticated, redirect to login
        return <Navigate to="/login" />;
    }

    return (
        <Box className="profile-container" maxW="md" mx="auto" mt={8}>
            <VStack spacing={4} align="center">
                <Heading className="profile-heading" size="lg">Profile</Heading>
                <Text className="profile-text">
                    <span className="profile-highlight">Username:</span> {data.me.username}
                </Text>
                <Text className="profile-text">
                    <span className="profile-highlight">Email:</span> {data.me.email}
                </Text>
                <Text className="profile-text">
                    <span className="profile-highlight">Member Since:</span> {new Date(data.me.createdAt).toLocaleDateString()}
                </Text>
            </VStack>
        </Box>
    );
};

export default Profile;
