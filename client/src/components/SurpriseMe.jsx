import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { RANDOM_PRODUCT_QUERY } from '../graphql/operations';
import { Box, Spinner, Text, VStack, Image, Button } from '@chakra-ui/react';
import { addToCart } from '../utils/cartUtils';
import { useNavigate } from 'react-router-dom';

const SurpriseMe = () => {
    const navigate = useNavigate();
    const [fetchRandomProduct, { data, loading, error }] = useLazyQuery(RANDOM_PRODUCT_QUERY, {
        fetchPolicy: 'network-only',
    });
    const [isProductFetched, setIsProductFetched] = useState(false);

    useEffect(() => {
        if (!isProductFetched) {
            fetchRandomProduct();
            setIsProductFetched(true);
        }
    }, [fetchRandomProduct, isProductFetched]);

    // Handle loading and error states
    if (loading) return <Spinner size="xl" />;
    if (error) return <Text color="red.500">Error fetching random product</Text>;

    // Display fetched product details
    const product = data?.randomProduct;

    return (
        <Box
            position="relative"
            textAlign="center"
            mt={8}
            px={8}
            zIndex={1} // Ensure buttons are above other content
        >
            {product ? (
                <Box
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    p={4}
                    bg="linear-gradient(to bottom right, #FFD700, #FFEC8B)"
                    _hover={{
                        bg: 'linear-gradient(to bottom right, #A9DFBF, #D4EFDF)',
                        transform: 'scale(1.05)',
                    }}
                    transition="all 0.3s"
                >
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
                            zIndex={2} // Ensure button is clickable
                            onClick={() => addToCart(product)}
                        >
                            Add to Cart
                        </Button>
                        <Button
                            mt={2}
                            variant="link"
                            color="teal.500"
                            zIndex={2} // Ensure button is clickable
                            onClick={() => navigate('/')}
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
