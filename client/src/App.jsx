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
import Footer from './components/Footer'; // Import the Footer component

const App = () => {
    return (
        <Router>
            <Snowfall /> {/* Add the Snowfall component */}
            <Navbar />
            <Box p={4} minHeight="calc(100vh - 150px)"> {/* Ensure full height minus header/footer */}
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
            <Footer /> {/* Add the Footer component here */}
        </Router>
    );
};

export default App;
