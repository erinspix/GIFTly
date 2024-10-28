import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { RANDOM_PRODUCT_QUERY } from '../graphql/operations';
import { Box, Spinner, Text } from '@chakra-ui/react';

const SurpriseMe = () => {
    const navigate = useNavigate();
    const [fetchRandomProduct, { data, loading, error }] = useLazyQuery(RANDOM_PRODUCT_QUERY);

    useEffect(() => {
        fetchRandomProduct(); // Fetch random product on component mount
    }, [fetchRandomProduct]);

    useEffect(() => {
        if (data?.randomProduct) {
            navigate(`/product/${data.randomProduct._id}`); // Navigate to the product detail page
        }
    }, [data, navigate]);

    if (loading) return <Spinner size="xl" />;
    if (error) return <Text color="red.500">Error fetching random product</Text>;

    return (
        <Box>
            <Text>Fetching a surprise gift for you...</Text>
        </Box>
    );
};

export default SurpriseMe;
