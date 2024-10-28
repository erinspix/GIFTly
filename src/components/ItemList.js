import React, { useState } from 'react';
import useFetch from '../hooks/useFetch'; // Custom hook for fetching data
import ItemCard from './ItemCard'; // Component to display individual item details
import SearchBar from './SearchBar'; // Component for search functionality
import './ItemList.css'; // CSS for styling the item list

// ItemList component to display a list of items
const ItemList = () => {
    // Use the custom useFetch hook to fetch items from the API
    const { data: items, loading, error } = useFetch('/api/items', localStorage.getItem('token'));
    
    // State for managing the search term
    const [searchTerm, setSearchTerm] = useState('');

    // Display loading message if data is still being fetched
    if (loading) return <div>Loading...</div>;

    // Display error message if there was an error fetching data
    if (error) return <div>Error: {error.message}</div>;

    // Filter items based on the search term entered by the user
    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        // Main container for the item list
        <div className="item-list">
            {/* Render the SearchBar component for searching items */}
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            {/* Render each item that matches the search term */}
            {filteredItems && filteredItems.map(item => (
                <ItemCard key={item._id} item={item} />
            ))}
        </div>
    );
};

// Export the ItemList component as the default export
export default ItemList;
