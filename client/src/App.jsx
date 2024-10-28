import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, Text } from '@chakra-ui/react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Products from './components/Products';
import Cart from './components/Cart';
import ProtectedRoute from './components/ProtectedRoute';
import SurpriseMe from './components/SurpriseMe';


const App = () => {
    return (
        <Router>
            <Navbar />
            
            {/* Tagline */}
            <Box 
                bg="#5DADE2" 
                color="white" 
                py={3} 
                textAlign="center" 
                boxShadow="sm"
            >
                <Text fontSize="lg" fontWeight="bold" fontFamily="Poppins, sans-serif">
                    Unique Handmade Gifts from Around the World, at Your Fingertips
                </Text>
            </Box>
            
            {/* Main content */}
            <Box p={4} px={8}>
                <Routes>
                <Route path="/surprise" element={<SurpriseMe />} />
                    <Route path="/" element={<Products />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/cart"
                        element={
                            <ProtectedRoute>
                                <Cart />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Box>
            
            <Footer />
        </Router>
    );
};

export default App;
