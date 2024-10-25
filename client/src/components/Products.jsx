import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { PRODUCTS_QUERY, ME_QUERY } from '../graphql/operations';
import {
    Box,
    Grid,
    Image,
    Text,
    Heading,
    Spinner,
    Button,
    VStack,
} from '@chakra-ui/react';
import { addToCart } from '../utils/cartUtils';
import { useNavigate } from 'react-router-dom';
import './global.css'; // Import CSS for snowflakes

const Products = () => {
    const { loading, error, data } = useQuery(PRODUCTS_QUERY);
    const { data: authData } = useQuery(ME_QUERY);
    const navigate = useNavigate();

    // Generate snowflakes
    useEffect(() => {
        const createSnowflakes = () => {
            const snowContainer = document.querySelector('.snow-container');
            if (snowContainer) {
                // Create 100 snowflakes
                for (let i = 0; i < 100; i++) {
                    const snowflake = document.createElement('div');
                    snowflake.className = 'snowflake';
                    snowflake.style.setProperty('--left', Math.random());
                    snowflake.style.setProperty('--size', `${Math.random() * 10 + 5}px`);
                    snowflake.style.setProperty('--duration', `${Math.random() * 5 + 5}s`);
                    snowflake.style.setProperty('--delay', `${Math.random() * 5}s`);
                    snowflake.textContent = '❄';
                    snowContainer.appendChild(snowflake);
                }
            }
        };

        createSnowflakes();

        return () => {
            const snowContainer = document.querySelector('.snow-container');
            if (snowContainer) {
                snowContainer.innerHTML = ''; // Clear snowflakes on cleanup
            }
        };
    }, []);

    if (loading) return <Spinner size="xl" />;
    if (error) return <Text color="red.500">Error fetching products</Text>;

    const handleAddToCart = (product) => {
        if (authData && authData.me) {
            addToCart(product);
            window.dispatchEvent(new Event('storage')); // Trigger storage event to update cart count
        } else {
            navigate('/login');
        }
    };

    return (
        <Box position="relative">
            <div className="snow-container" />
            <Heading mb={6} textAlign="center">Our Products</Heading>
            <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
                {data.products.map((product) => (
                    <Box key={product._id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
                        <Image
                            src={`/images/${product.imageUrl}`}
                            alt={product.name}
                            boxSize="150px"
                            objectFit="cover"
                            mx="auto"
                        />
                        <Box mt={2}>
                            <VStack spacing={1} align="start">
                                <Text fontWeight="bold" fontSize="lg">{product.name}</Text>
                                <Text>${product.price.toFixed(2)}</Text>
                                <Text>Craftsman: {product.craftsman}</Text>
                                <Text>Location: {product.location}</Text>
                                <Button
                                    mt={2}
                                    colorScheme="teal"
                                    size="sm"
                                    onClick={() => handleAddToCart(product)}
                                >
                                    Add to Cart
                                </Button>
                            </VStack>
                        </Box>
                    </Box>
                ))}
            </Grid>
        </Box>
    );
};

export default Products;
