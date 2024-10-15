import React from 'react';
import useFetch from '../hooks/useFetch';

const ItemList = () => {
  const { data: items, loading, error } = useFetch('/api/items', localStorage.getItem('token'));

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {items && items.map(item => (
        <div key={item._id}>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <p>${item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
