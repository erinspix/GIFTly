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
    Link,
    Badge,
} from '@chakra-ui/react';
import { getCart } from '../utils/cartUtils';

const Navbar = () => {
    const { loading, error, data } = useQuery(ME_QUERY, {
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

    // Update cart count whenever the cart changes
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
        // await client.refetchQueries({
        //     include: [ME_QUERY],
        // });
        
        window.location.reload();
    };

    if (loading) return null; 

    return (
        <Flex bg="teal.500" p={4} color="white" alignItems="center">
            <Box>
                <RouterLink to="/">
                    <Button variant="ghost" color="white">Home</Button>
                </RouterLink>
            </Box>
            <Spacer />
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