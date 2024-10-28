import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, Button } from '@chakra-ui/react';

import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Products from './components/Products';
import Cart from './components/Cart';
import ProtectedRoute from './components/ProtectedRoute';
import Snowfall from './components/Snowfall'; 
import Footer from './components/Footer'; 

const App = () => {
    const [isSnowfallActive, setIsSnowfallActive] = useState(true);

    return (
        <Router>
            <Snowfall active={isSnowfallActive} /> 
            <Navbar />
            
            <Box p={4} minHeight="calc(100vh - 150px)">
                {/* Toggle Button for Snowfall */}
                <Button
                    onClick={() => setIsSnowfallActive((prev) => !prev)}
                    colorScheme="teal"
                    mb={4}
                >
                    {isSnowfallActive ? 'Turn Off Snowfall' : 'Turn On Snowfall'}
                </Button>

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
