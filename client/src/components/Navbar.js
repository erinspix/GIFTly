import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
  return (
    <nav>
      <h1>Giftly</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/collection">My Collection</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

