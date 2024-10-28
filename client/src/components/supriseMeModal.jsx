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
    Spinner 
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
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Surprise Gift</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {loading ? (
                        <Spinner size="xl" />
                    ) : error ? (
                        <Text color="red.500">Error fetching product</Text>
                    ) : product ? (
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
                        <Text>No product found</Text>
                    )}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default SurpriseMeModal;
//i hate this