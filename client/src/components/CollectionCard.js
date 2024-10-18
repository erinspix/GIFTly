import React from 'react';
import './CollectionCard.css'; // Assuming you have a CSS file for styling

const CollectionCard = ({ collection }) => (
    <div className="collection-card">
        <h3>{collection.name}</h3>
        <p>{collection.description}</p>
        {collection.imageUrl && <img src={collection.imageUrl} alt={collection.name} />}
        <button onClick={() => handleViewCollection(collection.id)}>View Collection</button>
    </div>
);

// Optional: Define a handler function if needed
const handleViewCollection = (id) => {
    // Implement navigation to the collection detail page, e.g., using React Router
    console.log(`Viewing collection with ID: ${id}`);
};

export default CollectionCard;
