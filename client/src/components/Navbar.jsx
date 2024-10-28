import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useQuery, useApolloClient } from '@apollo/client';
import { ME_QUERY } from '../graphql/operations';
import {
    Box,
    Flex,
    Spacer,
    Button,
    Text,
    Heading,
    Badge,
    IconButton,
} from '@chakra-ui/react';
import { FaSnowflake } from 'react-icons/fa'; // Import snowflake icon
import { getCart } from '../utils/cartUtils';

const Navbar = ({ toggleSnowfall, isSnowing }) => {
    const { loading, data } = useQuery(ME_QUERY, {
        fetchPolicy: 'network-only',
    });
    const navigate = useNavigate();
    const client = useApolloClient();
    const [cartCount, setCartCount] = useState(0);

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

    if (loading) return null;

    return (
        <Flex
            direction="column"
            align="center"
            bg="#0A3D62"
            p={4}
            color="white"
            boxShadow="md"
            w="100%"
        >
            <Flex w="100%" alignItems="center" maxW="1200px">
                <Box>
                    <RouterLink to="/">
                        <Button variant="ghost" color="white" fontWeight="bold">Home</Button>
                    </RouterLink>
                </Box>

                <Spacer />
                <Box>
                    <Heading as="h1" size="lg" color="white" fontWeight="bold">
                        GIFTly
                    </Heading>
                </Box>
                <Spacer />

                {/* Snowflake Toggle Button */}
                <IconButton
                    icon={<FaSnowflake />}
                    aria-label="Toggle Snowfall"
                    onClick={toggleSnowfall}
                    size="sm"
                    colorScheme={isSnowing ? 'blue' : 'gray'}
                    variant="ghost"
                    ml={2}
                />

                {/* Login/Register or User Info */}
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

            {/* Tagline below GIFTly title */}
            <Box
                mt={2}
                p={2}
                w="100%"
                bg="#5DADE2"
                textAlign="center"
                color="white"
            >
                <Text fontSize="lg" fontWeight="bold" fontFamily="Poppins, sans-serif">
                    Unique Handmade Gifts from Around the World, at Your Fingertips
                </Text>
            </Box>
        </Flex>
    );
};

export default Navbar;
