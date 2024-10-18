
import React, { useState } from 'react';
import useFetch from '../hooks/useFetch';
import ItemCard from './ItemCard';
import SearchBar from './SearchBar';
import './ItemList.css';

const ItemList = () => {
    const { data: items, loading, error } = useFetch('/api/items', localStorage.getItem('token'));
    const [searchTerm, setSearchTerm] = useState('');

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    // Filter items based on search term
    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="item-list">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            {filteredItems && filteredItems.map(item => (
                <ItemCard key={item._id} item={item} />
            ))}
        </div>
    );
};

export default ItemList;


