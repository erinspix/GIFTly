import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, Image } from '@chakra-ui/react';

import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Products from './components/Products';
import Cart from './components/Cart';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
    return (
        <Router>
            <Navbar />
            {/* GIF Below Navbar */}
            <Box display="flex" justifyContent="center" mt={2}>
                <Image
                    src="../gigtlygif.gif" // Replace with your actual GIF path
                    alt="Giftly Gif"
                    maxH="200px" // Adjust the height as needed
                />
            </Box>
            {/* Main content */}
            <Box p={4}>
                <Routes>
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
        </Router>
    );
};

export default App;
