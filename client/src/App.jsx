import React from 'react';
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

const App = () => {
    return (
        <Router>
            <Snowfall /> {/* Add the Snowfall component here */}
            <Navbar />
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
