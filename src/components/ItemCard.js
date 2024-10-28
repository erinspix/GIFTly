import React from 'react';
import './ItemCard.css'; // Importing CSS file for styling

// ItemCard component to display individual item details
const ItemCard = ({ item }) => {
    return (
        // Main container for the item card
        <div className="item-card">
            {/* Display the item's name */}
            <h3>{item.name}</h3>

            {/* Display the item's description */}
            <p>{item.description}</p>

            {/* Display the item's price */}
            <p>${item.price}</p>
        </div>
    );
};

// Export the ItemCard component as the default export
export default ItemCard;
