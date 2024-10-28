import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useQuery, useApolloClient, useLazyQuery } from '@apollo/client';
import { ME_QUERY, RANDOM_PRODUCT_QUERY } from '../graphql/operations';
import {
    Box,
    Flex,
    Spacer,
    Button,
    Text,
    Link,
    Badge,
    Heading,
} from '@chakra-ui/react';
import { getCart } from '../utils/cartUtils';

const Navbar = () => {
    const { loading, error, data } = useQuery(ME_QUERY, {
        fetchPolicy: 'network-only',
    });
    const navigate = useNavigate();
    const client = useApolloClient();
    const [cartCount, setCartCount] = useState(0);

    const [fetchRandomProduct, { data: randomProductData }] = useLazyQuery(RANDOM_PRODUCT_QUERY);

    useEffect(() => {
        const cart = getCart();
        const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
        setCartCount(totalItems);
    }, []);

    useEffect(() => {
        const handleStorageChange = () => {
            const cart = getCart();
            const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
            setCartCount(totalItems);
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleLogout = async () => {
        localStorage.removeItem('id_token');
        localStorage.removeItem('cart');
        setCartCount(0);
        
        await client.clearStore();
        window.location.reload();
    };

    const handleSurpriseMe = async () => {
        console.log("Fetching a random product...");
        fetchRandomProduct(); // Fetch random product
        navigate('/surprise'); // Navigate to the SurpriseMe component
    };
    
    // Navigate to the product detail page when random product is fetched
    useEffect(() => {
        if (randomProductData?.randomProduct) {
            navigate(`/product/${randomProductData.randomProduct._id}`);
        }
    }, [randomProductData, navigate]);

    if (loading) return null;

    return (
        <Flex bg="#0A3D62" p={4} color="white" alignItems="center" boxShadow="md">
            {/* Home Button */}
            <Box>
                <RouterLink to="/">
                    <Button
                        variant="ghost"
                        color="white"
                        fontWeight="bold"
                        _hover={{ bg: '#0A2A4D' }}
                    >
                        Home
                    </Button>
                </RouterLink>
            </Box>

            {/* Surprise Me Button */}
            <Box ml={2}>
                <Button
                    variant="solid"
                    color="white"
                    bg="#5DADE2"
                    fontWeight="bold"
                    _hover={{ bg: '#3498DB' }}
                    onClick={handleSurpriseMe}
                >
                    Surprise Me
                </Button>
            </Box>

            {/* Centered GIFTly Title */}
            <Spacer />
            <Box>
                <Heading
                    as="h1"
                    size="lg"
                    color="white"
                    fontWeight="bold"
                    textAlign="center"
                    textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)"
                >
                    GIFTly
                </Heading>
            </Box>
            <Spacer />

            {/* User Info and Auth Links */}
            <Box>
                {data && data.me ? (
                    <Flex alignItems="center">
                        <Text mr={4}>Hello, {data.me.username}</Text>
                        <RouterLink to="/cart">
                            <Button variant="ghost" color="white" mr={4}>
                                Cart <Badge ml="1" colorScheme="red">{cartCount}</Badge>
                            </Button>
                        </RouterLink>
                        <RouterLink to="/profile">
                            <Button variant="ghost" color="white" mr={4}>Profile</Button>
                        </RouterLink>
                        <Button colorScheme="teal" onClick={handleLogout}>Logout</Button>
                    </Flex>
                ) : (
                    <Flex>
                        <RouterLink to="/login">
                            <Button variant="ghost" color="white" mr={4}>Login</Button>
                        </RouterLink>
                        <RouterLink to="/register">
                            <Button colorScheme="teal">Register</Button>
                        </RouterLink>
                    </Flex>
                )}
            </Box>
        </Flex>
    );
};

export default Navbar;
