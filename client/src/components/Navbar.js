import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css'; // Import your CSS here

const Navbar = () => {
    return (
        <nav>
            <h1>Giftly</h1>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/collection">My Collection</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;


