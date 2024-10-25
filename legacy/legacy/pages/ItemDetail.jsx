import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ItemDetail = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                const response = await axios.get(`/api/items/${id}`);
                setItem(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load item details');
                setLoading(false);
            }
        };

        fetchItemDetails();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Item Details for {item.name}</h2>
            <p>Price: ${item.price}</p>
            <p>Description: {item.description}</p>
            <img src={item.imageUrl} alt={item.name} />
        </div>
    );
};

export default ItemDetail;
