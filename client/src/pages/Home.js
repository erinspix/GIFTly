import React, { useEffect, useState } from 'react';
import ItemList from '../components/ItemList';
import axios from 'axios';

const Home = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('/api/items'); // Adjust endpoint as needed
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();
    }, []);

    return (
        <div>
            <h2>Item List</h2>
            <ItemList items={items} />
        </div>
    );
};

export default Home;

