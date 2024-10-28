import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { RANDOM_PRODUCT_QUERY } from '../graphql/operations';
import { Box, Spinner, Text, Image, Button, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const SurpriseMe = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);

    // Initialize lazy query for fetching a random product
    const [fetchRandomProduct, { data, loading, error }] = useLazyQuery(RANDOM_PRODUCT_QUERY, {
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
            console.log("Data received from GraphQL:", data);
            if (data?.randomProduct) {
                setProduct(data.randomProduct);
            } else {
                console.log("No product found in the response.");
            }
        },
        onError: (err) => {
            console.error("GraphQL Error:", err);
        },
    });

    // Fetch a random product on component mount
    useEffect(() => {
        console.log("Component mounted. Fetching random product...");
        fetchRandomProduct();
    }, [fetchRandomProduct]);

    // Display loading state
    if (loading) {
        console.log("Loading random product...");
        return <Spinner size="xl" />;
    }

    // Display error state
    if (error) {
        console.error("Error fetching random product:", error.message);
        return <Text color="red.500">Error fetching random product</Text>;
    }

    // If no product has been fetched yet
    if (!product) {
        console.log("No product data to display.");
        return <Text>Fetching a surprise gift for you...</Text>;
    }

    // Render the product
    return (
        <Box textAlign="center" mt={8} px={8}>
            <Box
                position="relative"
                zIndex={1}
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
                    src={`/images/${product.imageUrl}`} // Correct template literal
                    alt={product.name}
                    boxSize="150px"
                    objectFit="cover"
                    mx="auto"
                />
                <VStack spacing={1} align="start" mt={2}>
                    <Text fontWeight="bold" fontSize="lg" color="#0A3D62">
                        {product.name}
                    </Text>
                    <Text color="#0A3D62">${product.price.toFixed(2)}</Text>
                    <Text color="gray.600">Craftsman: {product.craftsman}</Text>
                    <Text color="gray.600">Location: {product.location}</Text>
                    <Button
                        mt={4}
                        colorScheme="teal"
                        onClick={() => navigate('/')}
                    >
                        Go Back Home
                    </Button>
                </VStack>
            </Box>
        </Box>
    );
};
// console.log("Total products count:", count);
// console.log("Selected random index:", randomIndex);
console.log("Random product fetched:", randomProduct);

export default SurpriseMe;
//