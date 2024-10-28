import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { RANDOM_PRODUCT_QUERY } from '../graphql/operations';
import { Box, Spinner, Text, Image, VStack, Button } from '@chakra-ui/react'; // Add VStack here
import { addToCart } from '../utils/cartUtils';

const SurpriseMe = () => {
    const navigate = useNavigate();
    const [fetchRandomProduct, { data, loading, error }] = useLazyQuery(RANDOM_PRODUCT_QUERY);

    // Fetch the random product on component mount
    useEffect(() => {
        fetchRandomProduct();
    }, [fetchRandomProduct]);

    // Display loading or error states
    if (loading) return <Spinner size="xl" />;
    if (error) return <Text color="red.500">Error fetching random product</Text>;

    // If random product data is fetched, display it
    const product = data?.randomProduct;

    if (!product) return <Text>No product found!</Text>;

    // Handle adding the random product to the cart
    const handleAddToCart = () => {
        addToCart(product);
        window.dispatchEvent(new Event('storage')); // Update cart count in Navbar
    };

    return (
        <Box p={4}>
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
                Surprise Gift for You!
            </Text>

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
                <Image
                    src={`/images/${product.imageUrl}`}
                    alt={product.name}
                    boxSize="200px"
                    objectFit="cover"
                    mx="auto"
                    mb={4}
                />
                <VStack spacing={1} align="start">
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
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </Button>
                </VStack>
            </Box>
        </Box>
    );
};

export default SurpriseMe;
