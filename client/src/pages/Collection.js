import React from 'react';
import CollectionCard from '../components/CollectionCard';

<<<<<<< HEAD
const Collection = () => {
  return (
    <div>
      <h2>My Gift Collection</h2>
      <CollectionCard />
    </div>
  );
=======
const collections = [
    { id: 1, name: 'Winter Gifts', description: 'All cozy items.', imageUrl: '/path-to-image' },
    { id: 2, name: 'Holiday Specials', description: 'Gifts for the holidays.', imageUrl: '/path-to-image' }
];

const Collection = () => {
    return (
        <div>
            <h2>My Gift Collection</h2>
            {collections.map(collection => (
                <CollectionCard key={collection.id} collection={collection} />
            ))}
        </div>
    );
>>>>>>> 7a9b4152fd8acbd1b91e2b7f19d9c566efd02984
};

export default Collection;
