import React, { useState, useEffect } from 'react';
import {
    Box,
    Heading,
    Text,
    VStack,
    HStack,
    Image,
    Button,
    Input,
    Divider,
} from '@chakra-ui/react';
import { getCart, removeFromCart, updateQuantity, clearCart } from '../utils/cartUtils';
import { useNavigate } from 'react-router-dom';
import Presents from './Presents';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const cart = getCart();
        setCartItems(cart);
    }, []);

    const handleRemove = (productId) => {
        removeFromCart(productId);
        setCartItems(getCart());
    };

    const handleQuantityChange = (productId, quantity) => {
        const qty = parseInt(quantity);
        if (isNaN(qty) || qty < 1) return;
        updateQuantity(productId, qty);
        setCartItems(getCart());
    };

    const handleCheckout = () => {
        alert('Proceeding to checkout...');
    };

    const calculateTotal = () => {
        return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
    };

    const handleClearCart = () => {
        clearCart();
        setCartItems([]);
    };

    if (!cartItems.length) {
        return (
            <Box textAlign="center" mt={8}>
                <Heading size="md">Your cart is empty.</Heading>
                <Button mt={4} colorScheme="teal" onClick={() => navigate('/')}>
                    Go Shopping
                </Button>
            </Box>
        );
    }

    return (
        <Box
            maxW="lg"
            mx="auto"
            mt={8}
            p={6}
            borderWidth={1}
            borderRadius="lg"
            boxShadow="xl"
            bg="white" // Removed the frosted glass effect
        >
            <Heading mb={6} textAlign="center">Your Cart</Heading>
            <VStack spacing={4} align="stretch">
                {cartItems.map((item) => (
                    <Box key={item._id} p={4} borderWidth={1} borderRadius="md" boxShadow="md">
                        <HStack spacing={4}>
                            <Image
                                src="./default-image.png" // Always use the default image
                                alt={item.name}
                                boxSize="80px"
                                objectFit="cover"
                            />
                            <VStack align="start" spacing={1} flex="1">
                                <Text fontWeight="bold" fontSize="lg">{item.name}</Text>
                                <Text color="gray.600">${item.price.toFixed(2)}</Text>
                                <HStack>
                                    <Text>Quantity:</Text>
                                    <Input
                                        type="number"
                                        size="sm"
                                        width="60px"
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                                        min="1"
                                    />
                                </HStack>
                            </VStack>
                            <Button colorScheme="red" size="sm" onClick={() => handleRemove(item._id)}>
                                Remove
                            </Button>
                        </HStack>
                    </Box>
                ))}
                <Divider />
                <HStack justifyContent="space-between" mt={4}>
                    <Text fontWeight="bold" fontSize="lg">Total:</Text>
                    <Text fontWeight="bold" fontSize="lg">${calculateTotal()}</Text>
                </HStack>
                <HStack spacing={4} mt={4}>
                    <Button
                        colorScheme="blue"
                        bg="#5DADE2"
                        _hover={{ bg: "#3498DB" }}
                        width="full"
                        onClick={handleCheckout}
                    >
                        Checkout
                    </Button>
                    <Button variant="outline" colorScheme="red" width="full" onClick={handleClearCart}>
                        Clear Cart
                    </Button>
                </HStack>
            </VStack>
            <Presents /> {/* Add the Presents component */}
        </Box>
    );
};

export default Cart;
