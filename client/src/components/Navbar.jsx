import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { RANDOM_PRODUCT_QUERY } from '../graphql/operations';
import {
    Box,
    Flex,
    Spacer,
    Button,
    Text,
    Link,
    Badge,
    Heading,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Image,
    VStack,
    useDisclosure,
    Spinner,
} from '@chakra-ui/react';

const Navbar = () => {
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [product, setProduct] = useState(null);

    const [fetchRandomProduct, { data, loading, error }] = useLazyQuery(RANDOM_PRODUCT_QUERY, {
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
            if (data?.randomProduct) {
                console.log("Random product fetched:", data.randomProduct);
                setProduct(data.randomProduct);
            }
        },
        onError: (err) => {
            console.error("GraphQL Error:", err);
        },
    });

    const handleSurpriseMe = () => {
        console.log("Opening Surprise Me modal...");
        fetchRandomProduct(); // Fetch random product
        onOpen(); // Open the modal
    };

    return (
        <Flex bg="#0A3D62" p={4} color="white" alignItems="center" boxShadow="md">
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

            <Spacer />
            <Box>
                <Heading as="h1" size="lg" color="white" fontWeight="bold" textAlign="center">
                    GIFTly
                </Heading>
            </Box>
            <Spacer />

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Surprise Gift</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {loading && <Spinner size="xl" />}
                        {error && <Text color="red.500">Error fetching product</Text>}
                        {product ? (
                            <Box textAlign="center">
                                <Image
                                    src={product.imageUrl}
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
                                </VStack>
                            </Box>
                        ) : (
                            <Text>No product found.</Text>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Flex>
    );
};

export default Navbar;
