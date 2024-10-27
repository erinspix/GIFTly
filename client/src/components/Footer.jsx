import React from 'react';
import { Box, Text, Image } from '@chakra-ui/react';
import gifImage from './giftlygif.gif'; // Adjust to the actual file name and path

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
            {/* GIF */}
            <Box display="flex" justifyContent="center" mb={4}>
                <Image
                    src={gifImage} // Use the imported GIF
                    alt="Fun GIF"
                    maxH="200px"
                />
            </Box>

            {/* Footer Text */}
            <Text fontSize="sm">
                © {new Date().getFullYear()} GIFTly. All Rights Reserved.
            </Text>
        </Box>
    );
};

export default Footer;
