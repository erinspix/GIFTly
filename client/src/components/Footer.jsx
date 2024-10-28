import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const Footer = () => {
    return (
        <Box
            as="footer"
            bg="#0A3D62"
            color="white"
            py={4}
            mt={8}
            textAlign="center"
        >
            {/* GIF Background */}
            <Box
                display="flex"
                justifyContent="center"
                mb={4}
                height="200px"
                backgroundImage="url('/giftlyDarkBlue.gif')" // Direct path
                backgroundRepeat="no-repeat"
                backgroundPosition="center"
                backgroundSize="contain"
            />

            {/* Footer Text */}
            <Text fontSize="sm">
                © {new Date().getFullYear()} GIFTly. All Rights Reserved.
            </Text>
        </Box>
    );
};

export default Footer;
