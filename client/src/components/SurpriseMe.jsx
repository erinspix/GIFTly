import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { RANDOM_PRODUCT_QUERY } from '../graphql/operations';
import { Box, Spinner, Text, Image, Button, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const SurpriseMe = () => {
    const navigate = useNavigate();
    const [fetchRandomProduct, { data, loading, error }] = useLazyQuery(RANDOM_PRODUCT_QUERY, {
        fetchPolicy: 'network-only',
    });

    const [product, setProduct] = useState(null);

    useEffect(() => {
        console.log("Component mounted: Fetching random product...");
        fetchRandomProduct();
    }, [fetchRandomProduct]);

    useEffect(() => {
        if (data?.randomProduct) {
            console.log("Random product fetched:", data.randomProduct);
            setProduct(data.randomProduct);
        }
    }, [data]);

    // Display loading or error state
    if (loading) {
        console.log("Loading random product...");
        return <Spinner size="xl" />;
    }

    if (error) {
        console.error("Error fetching random product:", error);
        return <Text color="red.500">Error fetching random product</Text>;
    }

    console.log("Product state:", product);

    return (
        <Box textAlign="center" mt={8} px={8}>
            {product ? (
                <Box
                    position="relative"
                    zIndex={1}
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    p={4}
                    bg="#FFFDE7" // Light cream background
                    border="2px solid #AEDFF7" // Soft blue border
                    _hover={{
                        bg: '#D1F2EB', // Light teal hover
                        transform: 'scale(1.05)',
                        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)', // Hover shadow
                    }}
                    transition="all 0.3s"
                >
                    <Image
                        src={`/images/${product.imageUrl}`}
                        alt={product.name}
                        boxSize="150px"
                        objectFit="cover"
                        mx="auto"
                    />
                    <VStack spacing={1} align="start" mt={2}>
                        <Text fontWeight="bold" fontSize="lg" color="#0A3D62">
                            {product.name}
                        </Text>
                        <Text color="#0A3D62">${product.price.toFixed(2)}</Text>
                        <Text color="gray.600">Craftsman: {product.craftsman}</Text>
                        <Text color="gray.600">Location: {product.location}</Text>
                        <Button
                            mt={4}
                            colorScheme="teal"
                            onClick={() => {
                                console.log("Navigating back to home...");
                                navigate('/');
                            }}
                        >
                            Go Back Home
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
