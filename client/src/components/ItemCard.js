import React from 'react';
import './ItemCard.css'; // Create this CSS file for styling

const ItemCard = ({ item }) => {
    return (
        <div className="item-card">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>${item.price}</p>
        </div>
    );
};

export default ItemCard;

