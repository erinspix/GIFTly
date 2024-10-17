// src/components/SearchBar.js
import React from 'react';
import './SearchBar.css'; // Optional: Create a CSS file for styling

const SearchBar = ({ searchTerm, setSearchTerm }) => {
    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search for items..."
                value={searchTerm}
                onChange={handleInputChange}
            />
        </div>
    );
};

export default SearchBar;
