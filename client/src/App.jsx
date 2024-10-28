import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Products from './components/Products';
import Cart from './components/Cart';
import ProtectedRoute from './components/ProtectedRoute';
import Snowfall from './components/Snowfall'; // Import the Snowfall component
import Footer from './components/Footer'; // Import the Footer component

const App = () => {
    const [isSnowing, setIsSnowing] = useState(true);

    const toggleSnowfall = () => setIsSnowing((prev) => !prev);

    return (
        <Router>
            {isSnowing && <Snowfall />} {/* Only show snowfall if enabled */}
            <Navbar toggleSnowfall={toggleSnowfall} isSnowing={isSnowing} />
            <Box p={4} minHeight="calc(100vh - 150px)">
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
            <Footer />
        </Router>
    );
};

export default App;
