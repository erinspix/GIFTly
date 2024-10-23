import React, { useEffect, useState } from 'react';
// import ItemList from '../components/ItemList';
import axios from 'axios';

const Home = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('/api/items');
                setItems(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load items');
                setLoading(false);
            }
        };
        fetchItems();
    }, []);

    return (
        <div>
            <h2>Item List</h2>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {/* !loading && !error && <ItemList items={items} /> */}
        </div>
    );
};

export default Home;
