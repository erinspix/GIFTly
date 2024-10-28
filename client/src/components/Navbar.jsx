import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useLazyQuery, useQuery } from '@apollo/client';
import { ME_QUERY, RANDOM_PRODUCT_QUERY } from '../graphql/operations';
import {
    Box,
    Flex,
    Spacer,
    Button,
    Text,
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

    // Fetch user data to check authentication status
    const { data: userData, loading: userLoading, error: userError } = useQuery(ME_QUERY, {
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
            console.log("User data fetched:", data);
        },
        onError: (err) => {
            console.error("Error fetching user data:", err);
        },
    });

    const [fetchRandomProduct, { loading, error }] = useLazyQuery(RANDOM_PRODUCT_QUERY, {
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
            if (data?.randomProduct) {
                console.log("Step 3: Random product fetched:", data.randomProduct);
                setProduct(data.randomProduct);
            }
        },
        onError: (err) => {
            console.error("GraphQL Error:", err);
        },
    });

    const handleSurpriseMe = () => {
        console.log("Step 1: Opening Surprise Me modal...");
        onOpen(); // Open the modal
        console.log("Step 2: Fetching random product...");
        fetchRandomProduct(); // Fetch random product
    };

    // Check for user loading state
    useEffect(() => {
        if (userLoading) {
            console.log("Loading user data...");
        } else {
            console.log("User data loaded:", userData);
        }
    }, [userLoading, userData]);

    // Ensure user data is fetched or show buttons by default
    if (userLoading) return <Spinner size="lg" color="white" />;

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
                <Heading as="h1" size="lg" color="white" fontWeight="bold" textAlign="center">
                    GIFTly
                </Heading>
            </Box>
            <Spacer />

            {/* Login/Register or User Info */}
            <Box>
                {userError ? (
                    <Text color="red.500">Error loading user data</Text>
                ) : userData?.me ? (
                    <Flex alignItems="center">
                        <Text mr={4}>Hello, {userData.me.username}</Text>
                        <Button colorScheme="teal" onClick={() => {
                            console.log("Logging out...");
                            localStorage.removeItem('id_token');
                            window.location.reload();
                        }}>
                            Logout
                        </Button>
                    </Flex>
                ) : (
                    <Flex>
                        <RouterLink to="/login">
                            <Button variant="ghost" color="white" mr={4}>
                                Login
                            </Button>
                        </RouterLink>
                        <RouterLink to="/register">
                            <Button colorScheme="teal">Register</Button>
                        </RouterLink>
                    </Flex>
                )}
            </Box>

            {/* Surprise Me Modal */}
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Surprise Gift</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {loading && <Spinner size="xl" />}
                        {error && <Text color="red.500">Error fetching product</Text>}
                        {product ? (
                            <Box textAlign="center" mt={4}>
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
                            !loading && <Text>No product found.</Text>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Flex>
    );
};

export default Navbar;
