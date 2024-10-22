import React from 'react';
import './CollectionCard.css';

const CollectionCard = ({ collection, onView }) => {
    const handleViewCollection = () => {
        if (onView) onView(collection.id);
    };

    return (
        <div className="collection-card">
            <h3 className="collection-title">{collection.name}</h3>
            {collection.imageUrl && (
                <img
                    src={collection.imageUrl}
                    alt={collection.name}
                    className="collection-image"
                />
            )}
            <button onClick={handleViewCollection}>View Collection</button>
        </div>
    );
};

export default CollectionCard;
