import React, { useState } from 'react';

const WishList = () => {
    // Sample data for gifts
    const [gifts, setGifts] = useState([
        { id: 1, recipient: 'Alice', gift: 'Organic Cotton Scarf', date: '2024-01-15', checked: false },
        { id: 2, recipient: 'Bob', gift: 'Ceramic Coffee Mug', date: '2024-02-10', checked: false },
        { id: 3, recipient: 'Charlie', gift: 'Bamboo Serving Tray', date: '2024-03-05', checked: false },
        // Add more items as needed
    ]);

    const handleCheck = (id) => {
        setGifts(gifts.map(gift => 
            gift.id === id ? { ...gift, checked: !gift.checked } : gift
        ));
    };

    return (
        <div className="gift-history">
            <h2>🎁 Wish List 🎁</h2>
            {gifts.map(({ id, recipient, gift, checked }) => (
                <div key={id} className="gift-item">
                    <button className="dropdown-button" onClick={() => handleCheck(id)}>
                        {checked ? '✔️ ' : '❌ '} {recipient}: {gift}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default WishList;

