import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { RANDOM_PRODUCT_QUERY } from '../graphql/operations';
import { Box, Spinner, Text, Button, VStack, Image } from '@chakra-ui/react';

const SurpriseMe = () => {
    const navigate = useNavigate();
    const [fetchRandomProduct, { data, loading, error }] = useLazyQuery(RANDOM_PRODUCT_QUERY);
    const [isNavigating, setIsNavigating] = useState(false);

    // Fetch random product on component mount
    useEffect(() => {
        fetchRandomProduct();
    }, [fetchRandomProduct]);

    // Handle fetched random product
    useEffect(() => {
        if (data?.randomProduct && !isNavigating) {
            setIsNavigating(true); // Prevent further navigation triggers
            navigate(`/product/${data.randomProduct._id}`);
        }
    }, [data, navigate, isNavigating]);

    // Handle loading and error states
    if (loading) return <Spinner size="xl" />;
    if (error) return <Text color="red.500">Error fetching random product</Text>;

    // Display fetched product details
    const product = data?.randomProduct;

    return (
        <Box textAlign="center" mt={8}>
            {product ? (
                <Box>
                    <VStack spacing={4} align="center">
                        <Image
                            src={`/images/${product.imageUrl}`}
                            alt={product.name}
                            boxSize="150px"
                            objectFit="cover"
                        />
                        <Text fontWeight="bold" fontSize="lg" color="#0A3D62">
                            {product.name}
                        </Text>
                        <Text color="#0A3D62">${product.price.toFixed(2)}</Text>
                        <Text color="gray.600">Craftsman: {product.craftsman}</Text>
                        <Text color="gray.600">Location: {product.location}</Text>
                        <Button
                            mt={2}
                            colorScheme="teal"
                            size="sm"
                            onClick={() => navigate(`/product/${product._id}`)}
                        >
                            View Details
                        </Button>
                    </VStack>
                </Box>
            ) : (
                <Text>Fetching a surprise gift for you...</Text>
            )}
        </Box>
    );
};

export default SurpriseMe;
