// import React, { useEffect, useState } from 'react';
// import { useLazyQuery } from '@apollo/client';
// import { RANDOM_PRODUCT_QUERY } from '../graphql/operations';
// import { Box, Spinner, Text, Image, Button, VStack } from '@chakra-ui/react';
// import { useNavigate } from 'react-router-dom';

// const SurpriseMe = () => {
//     const navigate = useNavigate();
//     const [product, setProduct] = useState(null);

//     // Initialize lazy query for fetching a random product
//     const [fetchRandomProduct, { data, loading, error }] = useLazyQuery(RANDOM_PRODUCT_QUERY, {
//         fetchPolicy: 'network-only',
//         onCompleted: (data) => {
//             console.log("Step 3: onCompleted callback triggered.");
//             console.log("Data received from GraphQL:", data);

//             if (data?.randomProduct) {
//                 console.log("Step 4: Setting random product to state.");
//                 setProduct(data.randomProduct);
//             } else {
//                 console.log("Step 4.1: No product found in response.");
//             }
//         },
//         onError: (err) => {
//             console.error("Step 3.1: GraphQL Error occurred:", err.message);
//             if (err.message.includes('canceled')) {
//                 console.log("Step 3.2: Fetch canceled, retrying...");
//                 fetchRandomProduct();
//             }
//         },
//     });

//     // Fetch a random product on component mount
//     useEffect(() => {
//         console.log("Step 1: Component mounted. Initiating fetch for random product...");
//         fetchRandomProduct();
//     }, [fetchRandomProduct]);

//     // Display loading state
//     if (loading) {
//         console.log("Step 2: Loading random product...");
//         return <Spinner size="xl" />;
//     }

//     // Display error state
//     if (error) {
//         console.error("Step 5: Error fetching random product:", error.message);
//         return <Text color="red.500">Error fetching random product</Text>;
//     }

//     // If no product has been fetched yet
//     if (!product) {
//         console.log("Step 6: No product data available yet.");
//         return <Text>Fetching a surprise gift for you...</Text>;
//     }

//     // Render the product
//     console.log("Step 7: Rendering random product:", product);

//     return (
//         <Box textAlign="center" mt={8} px={8}>
//             <Box
//                 position="relative"
//                 zIndex={1}
//                 borderWidth="1px"
//                 borderRadius="lg"
//                 overflow="hidden"
//                 p={4}
//                 bg="linear-gradient(to bottom right, #FFD700, #FFEC8B)"
//                 _hover={{
//                     bg: 'linear-gradient(to bottom right, #A9DFBF, #D4EFDF)',
//                     transform: 'scale(1.05)',
//                 }}
//                 transition="all 0.3s"
//             >
//                 <Image
//                     src={product.imageUrl}
//                     alt={product.name}
//                     boxSize="150px"
//                     objectFit="cover"
//                     mx="auto"
//                 />
//                 <VStack spacing={1} align="start" mt={2}>
//                     <Text fontWeight="bold" fontSize="lg" color="#0A3D62">
//                         {product.name}
//                     </Text>
//                     <Text color="#0A3D62">${product.price.toFixed(2)}</Text>
//                     <Text color="gray.600">Craftsman: {product.craftsman}</Text>
//                     <Text color="gray.600">Location: {product.location}</Text>
//                     <Button
//                         mt={4}
//                         colorScheme="teal"
//                         onClick={() => {
//                             console.log("Step 8: Navigating to home...");
//                             navigate('/');
//                         }}
//                     >
//                         Go Back Home
//                     </Button>
//                 </VStack>
//             </Box>
//         </Box>
//     );
// };

// export default SurpriseMe;
