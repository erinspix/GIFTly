import React from 'react';
import { useQuery } from '@apollo/client';
import { ME_QUERY } from '../graphql/operations';
import { Navigate } from 'react-router-dom';
import { Spinner, Box } from '@chakra-ui/react';

const ProtectedRoute = ({ children }) => {
    const { loading, error, data } = useQuery(ME_QUERY, {
        fetchPolicy: 'cache-and-network',
    });

    if (loading) return <Box textAlign="center" mt={8}><Spinner size="xl" /></Box>;
    if (error) return <Navigate to="/login" />;
    if (!data.me) return <Navigate to="/login" />;

    return children;
};

export default ProtectedRoute;