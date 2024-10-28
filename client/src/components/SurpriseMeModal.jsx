import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { RANDOM_PRODUCT_QUERY } from '../graphql/operations';
import { 
    Modal, 
    ModalOverlay, 
    ModalContent, 
    ModalHeader, 
    ModalCloseButton, 
    ModalBody, 
    Box, 
    Text, 
    Image, 
    VStack, 
    Spinner, 
    Button 
} from '@chakra-ui/react';

const SurpriseMeModal = ({ isOpen, onClose }) => {
    const [product, setProduct] = useState(null);

    // Initialize lazy query for fetching a random product
    const [fetchRandomProduct, { loading, data, error }] = useLazyQuery(RANDOM_PRODUCT_QUERY, {
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
            if (data?.randomProduct) {
                setProduct(data.randomProduct);
            }
        },
    });

    useEffect(() => {
        if (isOpen) {
            fetchRandomProduct();
        }
    }, [isOpen, fetchRandomProduct]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
            <ModalOverlay 
                bg="rgba(0, 0, 0, 0.6)" 
                backdropFilter="blur(4px)" 
            />
            <ModalContent 
                bg="linear-gradient(to bottom right, #B3E5FC, #D1F2EB)" 
                borderRadius="lg" 
                boxShadow="0 8px 24px rgba(0, 0, 0, 0.2)"
                overflow="hidden"
                position="relative"
                p={4}
            >
                <ModalHeader 
                    fontSize="2xl" 
                    fontWeight="bold" 
                    textAlign="center"
                    color="#0A3D62"
                    textShadow="2px 2px 4px rgba(0, 0, 0, 0.3)"
                >
                    Surprise Gift
                </ModalHeader>
                <ModalCloseButton 
                    _hover={{ bg: 'rgba(0, 0, 0, 0.1)' }} 
                    _focus={{ boxShadow: 'none' }} 
                />
                <ModalBody textAlign="center" py={6}>
                    {loading ? (
                        <Spinner size="xl" color="#5DADE2" />
                    ) : error ? (
                        <Text color="red.500">Error fetching product</Text>
                    ) : product ? (
                        <Box
                            bg="white"
                            p={4}
                            borderRadius="md"
                            boxShadow="0 4px 12px rgba(0, 0, 0, 0.2)"
                            transition="all 0.3s"
                            _hover={{ transform: 'scale(1.03)' }}
                        >
                            <Image
                                src={`/images/${product.imageUrl}`}
                                alt={product.name}
                                boxSize="150px"
                                objectFit="cover"
                                mx="auto"
                                borderRadius="md"
                                mb={4}
                                boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
                            />
                            <VStack spacing={2} align="center">
                                <Text fontWeight="bold" fontSize="lg" color="#0A3D62">
                                    {product.name}
                                </Text>
                                <Text color="#0A3D62" fontSize="md">
                                    ${product.price.toFixed(2)}
                                </Text>
                                <Text color="gray.600" fontSize="sm">
                                    Craftsman: {product.craftsman}
                                </Text>
                                <Text color="gray.600" fontSize="sm">
                                    Location: {product.location}
                                </Text>
                            </VStack>
                        </Box>
                    ) : (
                        <Text>No product found</Text>
                    )}
                </ModalBody>
                <Button
                    mt={4}
                    colorScheme="teal"
                    alignSelf="center"
                    onClick={onClose}
                >
                    Close
                </Button>
            </ModalContent>
        </Modal>
    );
};

export default SurpriseMeModal;
