import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { RANDOM_PRODUCT_QUERY } from '../graphql/operations';
import { Box, Spinner, Text, Button } from '@chakra-ui/react';

const SurpriseMe = () => {
    const navigate = useNavigate();
    const [fetchRandomProduct, { data, loading, error }] = useLazyQuery(RANDOM_PRODUCT_QUERY, {
        fetchPolicy: 'network-only',
    });

    useEffect(() => {
        const token = localStorage.getItem('id_token');
        if (!token) {
            navigate('/login'); // Redirect to login if no token
        } else {
            fetchRandomProduct(); // Fetch random product on component mount
        }
    }, [fetchRandomProduct, navigate]);

    if (loading) return <Spinner size="xl" />;
    if (error) return <Text color="red.500">Error fetching random product</Text>;

    const product = data?.randomProduct;

    return (
        <Box textAlign="center" mt={8}>
            {product ? (
                <Box>
                    <Text fontWeight="bold" fontSize="lg">{product.name}</Text>
                    <Text>${product.price.toFixed(2)}</Text>
                    <Button mt={4} colorScheme="teal" onClick={() => navigate('/')}>
                        Go Back Home
                    </Button>
                </Box>
            ) : (
                <Text>Fetching a surprise gift for you...</Text>
            )}
        </Box>
    );
};

export default SurpriseMe;
