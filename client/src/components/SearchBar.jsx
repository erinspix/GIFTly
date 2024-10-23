// src/components/SearchBar.js

import React from 'react';
import './SearchBar.css'; // Import CSS for styling the search bar

// SearchBar component to filter items based on user input
const SearchBar = ({ searchTerm, setSearchTerm }) => {

    // Handler function to update the search term as the user types
    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="search-bar">
            {/* Input field for entering search term */}
            <input
                type="text"
                placeholder="Search for items..."
                value={searchTerm}
                onChange={handleInputChange}
            />
        </div>
    );
};

// Export the SearchBar component as the default export
export default SearchBar;
