import React from 'react';
import useFetch from '../hooks/useFetch';
import ItemCard from './ItemCard';
import './ItemList.css'; // Import the CSS file

const ItemList = () => {
    const { data: items, loading, error } = useFetch('/api/items', localStorage.getItem('token'));

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="item-list">
            {items && items.map(item => (
                <ItemCard key={item._id} item={item} />
            ))}
        </div>
    );
};

export default ItemList;

