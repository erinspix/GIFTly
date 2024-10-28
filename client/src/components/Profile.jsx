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

import './profile.css'; // Import the updated CSS

const Profile = () => {
    const { loading, error, data } = useQuery(ME_QUERY, {
        fetchPolicy: 'cache-and-network',
    });

    if (loading) return <Spinner size="xl" className="spinner" />;
    if (error) return <Text color="red.500">Error fetching profile</Text>;

    if (!data.me) {
        return <Navigate to="/login" />;
    }

    return (
        <Box className="profile-container" maxW="lg" mx="auto" mt={8}>
            <VStack spacing={6} align="center" className="centered-content">
                <Heading className="profile-heading">Welcome, {data.me.username}!</Heading>
                
                <Box className="profile-info-box">
                    <Text className="profile-text">
                        <span className="profile-highlight">Username:</span> {data.me.username}
                    </Text>
                </Box>

                <Box className="profile-info-box">
                    <Text className="profile-text">
                        <span className="profile-highlight">Email:</span> {data.me.email}
                    </Text>
                </Box>

                <Box className="profile-info-box">
                    <Text className="profile-text">
                        <span className="profile-highlight">Member Since:</span> {new Date(data.me.createdAt).toLocaleDateString()}
                    </Text>
                </Box>
            </VStack>
        </Box>
    );
};

export default Profile;
