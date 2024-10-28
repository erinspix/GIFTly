import React, { useEffect, useState } from 'react';
import './snowflakes.css'; // Import your CSS

const Snowfall = ({ active }) => {
    const [fallingItems, setFallingItems] = useState([]);

    useEffect(() => {
        if (!active) {
            setFallingItems([]); // Clear the snowflakes when deactivated
            return;
        }

        const createFallingItem = () => {
            const newItem = {
                id: Math.random(),
                left: Math.random(),
                size: `${Math.random() * 2 + 0.5}rem`,
                duration: `${Math.random() * 5 + 5}s`,
                delay: `${Math.random() * 2}s`,
                symbol: Math.random() > 0.5 ? '🎁' : '🎄',
            };

            setFallingItems((prevItems) => [...prevItems, newItem]);

            setTimeout(() => {
                setFallingItems((prevItems) =>
                    prevItems.filter((item) => item.id !== newItem.id)
                );
            }, 10000);
        };

        const intervalId = setInterval(createFallingItem, 200);

        return () => clearInterval(intervalId);
    }, [active]);

    return (
        <div className="snow-container">
            {fallingItems.map((item) => (
                <div
                    key={item.id}
                    className="snowflake"
                    style={{
                        '--left': item.left,
                        '--size': item.size,
                        '--duration': item.duration,
                        '--delay': item.delay,
                    }}
                >
                    {item.symbol}
                </div>
            ))}
        </div>
    );
};

export default Snowfall;
