import React from 'react';
import { useQuery } from '@apollo/client';
import { PRODUCTS_QUERY } from '../graphql/operations';
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
import { useQuery as useAuthQuery } from '@apollo/client';
import { ME_QUERY } from '../graphql/operations';

const Products = () => {
    const { loading, error, data } = useQuery(PRODUCTS_QUERY);
    const navigate = useNavigate();
    const { data: authData } = useQuery(ME_QUERY);

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
        <Box>
            <Heading mb={6}>Our Products</Heading>
            <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
                {data.products.map((product) => (
                    <Box key={product._id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
                        <Image src={`/assets/${product.imageUrl}`} alt={product.name} boxSize="150px" objectFit="cover" mx="auto" />
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