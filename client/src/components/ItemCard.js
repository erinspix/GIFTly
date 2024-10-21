import React from 'react';
import './ItemCard.css';

const ItemCard = ({ item }) => {
    return (
        <div className="item-card">
            <img src={item.imageUrl} alt={item.name} className="item-image" />
            <h3 className="item-title">{item.name}</h3>
            <p className="item-price">${item.price.toFixed(2)}</p>
            <button className="add-to-cart-btn">Add to Cart</button>
        </div>
    );
};

export default ItemCard;
