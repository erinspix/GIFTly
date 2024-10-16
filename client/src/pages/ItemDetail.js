import React from 'react';
import { useParams } from 'react-router-dom';

const ItemDetail = () => {
  const { id } = useParams();

  // Fetch item details based on ID
  return (
    <div>
      <h2>Item Details for {id}</h2>
      {/* Add details here */}
    </div>
  );
};

export default ItemDetail;
