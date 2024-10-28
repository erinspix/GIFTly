import React from 'react';
import './CollectionCard.css';

// The CollectionCard component takes in a collection object and an optional onView function as props
const CollectionCard = ({ collection, onView }) => {
    // Function to handle viewing the collection when the button is clicked
    const handleViewCollection = () => {
        // If the onView function is provided, call it with the collection ID
        if (onView) onView(collection.id);
    };

    return (
        // Main container for the collection card
        <div className="collection-card">
            {/* Display the collection's name */}
            <h3 className="collection-title">{collection.name}</h3>

            {/* Conditionally render the image if an imageUrl is available */}
            {collection.imageUrl && (
                <img
                    src={collection.imageUrl}
                    alt={collection.name}
                    className="collection-image"
                />
            )}

            {/* Button to trigger viewing the collection */}
            <button onClick={handleViewCollection}>View Collection</button>
        </div>
    );
};

// Export the CollectionCard component as the default export
export default CollectionCard;
