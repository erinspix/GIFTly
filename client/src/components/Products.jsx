import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { PRODUCTS_QUERY, ME_QUERY } from '../graphql/operations';
import {
    Box,
    Grid,
    Image,
    Text,
    Spinner,
    Button,
    VStack,
} from '@chakra-ui/react';
import { addToCart } from '../utils/cartUtils';
import { useNavigate } from 'react-router-dom';
import './snowflakes.css'; // Import CSS for snowflake styles

const Products = () => {
    const { loading, error, data } = useQuery(PRODUCTS_QUERY);
    const { data: authData } = useQuery(ME_QUERY);
    const navigate = useNavigate();

    // Snowflake Animation
    useEffect(() => {
        const snowContainer = document.querySelector('.snow-container');

        // Create a single snowflake
        const createSnowflake = () => {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';

            // Set random properties for each snowflake
            const size = Math.random() * 10 + 5; // Size between 5px and 15px
            const left = Math.random(); // Random horizontal position
            const duration = Math.random() * 15 + 10; // Duration between 10s and 25s
            const delay = Math.random() * 5 + 3; // Delay between 3s and 8s

            // Set CSS variables
            snowflake.style.setProperty('--size', ${size}px);
            snowflake.style.setProperty('--left', left);
            snowflake.style.setProperty('--duration', ${duration}s);
            snowflake.style.setProperty('--delay', ${delay}s);

            // Snowflake symbol
            snowflake.textContent = '❄️';
            snowContainer.appendChild(snowflake);

            // Remove the snowflake after it finishes falling
            setTimeout(() => {
                snowflake.remove();
            }, (duration + delay) * 1000);
        };

        // Create snowflakes at random intervals
        const interval = setInterval(() => {
            if (Math.random() < 0.2) { // 20% chance to create a snowflake per interval
                createSnowflake();
            }
        }, 500); // Check every 500ms

        // Cleanup function on component unmount
        return () => {
            clearInterval(interval);
            if (snowContainer) {
                snowContainer.innerHTML = ''; // Clear snowflakes
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

    // Limit to 12 products for a 4x3 grid
    const displayedProducts = data.products.slice(0, 12);

    return (
        <Box position="relative" px={8} py={4}>
            {/* Snowflake Container */}
            <div className="snow-container" />

            {/* Products Grid */}
            <Grid
                templateColumns="repeat(4, 1fr)" // Set 4 columns
                templateRows="repeat(3, auto)" // Set 3 rows
                gap={6}
            >
                {displayedProducts.map((product) => (
                    <Box
                        key={product._id}
                        borderWidth="1px"
                        borderRadius="lg"
                        overflow="hidden"
                        p={4}
                        bg="linear-gradient(to bottom right, #FFD700, #FFEC8B)" // Soft gold gradient
                        _hover={{
                            bg: 'linear-gradient(to bottom right, #A9DFBF, #D4EFDF)', // Soft green hover
                            transform: 'scale(1.05)',
                        }}
                        transition="all 0.3s"
                    >
                        <Image
                            src={/images/${product.imageUrl}}
                            alt={product.name}
                            boxSize="150px"
                            objectFit="cover"
                            mx="auto"
                        />
                        <Box mt={2}>
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