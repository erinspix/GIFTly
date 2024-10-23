import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component for navigation

import './Navbar.css'; // Import the CSS file for styling

// Navbar component for site navigation
const Navbar = () => {
    return (
        <nav>
            {/* Site title */}
            <h1>Giftly</h1>
            {/* Navigation links */}
            <ul>
                {/* Link to Home page */}
                <li><Link to="/">Home</Link></li>
                {/* Link to My Collection page */}
                <li><Link to="/collection">My Collection</Link></li>
                {/* Link to Login page */}
                <li><Link to="/login">Login</Link></li>
            </ul>
        </nav>
    );
};

// Export the Navbar component as the default export
export default Navbar;
