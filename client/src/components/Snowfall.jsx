import React, { useEffect, useState } from 'react';
import './snowflakes.css'; // Import your CSS

const Presents = () => {
    const [fallingItems, setFallingItems] = useState([]);

    useEffect(() => {
        // Function to create a new falling item
        const createFallingItem = () => {
            const newItem = {
                id: Math.random(),
                left: Math.random(),
                size: `${Math.random() * 2 + 0.5}rem`,
                duration: `${Math.random() * 5 + 5}s`,
                delay: `${Math.random() * 5}s`, // Random delay for staggered start
                symbol: Math.random() > 0.5 ? '🎁' : '🎄',
            };

            setFallingItems((prevItems) => [...prevItems, newItem]);

            // Remove the item after it reaches the bottom
            setTimeout(() => {
                setFallingItems((prevItems) =>
                    prevItems.filter((item) => item.id !== newItem.id)
                );
            }, 10000); // 10s lifespan, matching max duration
        };

        // Interval to create falling items every 500ms for staggered effect
        const intervalId = setInterval(createFallingItem, 500);

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);

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
