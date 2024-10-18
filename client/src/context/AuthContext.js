import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Load user from localStorage on initial render
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData)); // Persist user in localStorage
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user'); // Remove user from localStorage
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

