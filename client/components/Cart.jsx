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
    Spinner,
} from '@chakra-ui/react';
import { getCart, removeFromCart, updateQuantity, clearCart } from '../utils/cartUtils';
import { useNavigate } from 'react-router-dom';

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
        // Placeholder for Checkout functionality
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
        <Box maxW="lg" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="lg">
            <Heading mb={6}>Your Cart</Heading>
            <VStack spacing={4} align="stretch">
                {cartItems.map((item) => (
                    <HStack key={item._id} spacing={4}>
                        <Image src={`/assets/${item.imageUrl}`} alt={item.name} boxSize="80px" objectFit="cover" />
                        <VStack align="start" spacing={1} flex="1">
                            <Text fontWeight="bold">{item.name}</Text>
                            <Text>${item.price.toFixed(2)}</Text>
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
                ))}
                <Divider />
                <HStack justifyContent="space-between">
                    <Text fontWeight="bold">Total:</Text>
                    <Text fontWeight="bold">${calculateTotal()}</Text>
                </HStack>
                <HStack spacing={4}>
                    <Button colorScheme="teal" onClick={handleCheckout}>
                        Checkout
                    </Button>
                    <Button variant="outline" colorScheme="red" onClick={handleClearCart}>
                        Clear Cart
                    </Button>
                </HStack>
            </VStack>
        </Box>
    );
};

export default Cart;