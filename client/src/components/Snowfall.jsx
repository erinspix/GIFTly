import React, { useEffect, useState } from 'react';
import './snowflakes.css'; // Import your CSS

const Snowfall = () => {
    const [fallingItems, setFallingItems] = useState([]);

    useEffect(() => {
        const createFallingItem = () => {
            const newItem = {
                id: Math.random(),
                left: Math.random(), // Random horizontal position
                size: `${Math.random() * 2 + 0.5}rem`, // Random size between 0.5rem and 2.5rem
                duration: `${Math.random() * 5 + 5}s`, // Random duration between 5s and 10s
                delay: `${Math.random() * 10}s`, // Random delay for staggered start
                symbol: Math.random() > 0.5 ? '❄️' : '🎄', // Randomly choose a snowflake or tree
            };

            // Add the new item to the list
            setFallingItems((prevItems) => [...prevItems, newItem]);

            // Remove the item after it reaches the bottom
            setTimeout(() => {
                setFallingItems((prevItems) =>
                    prevItems.filter((item) => item.id !== newItem.id)
                );
            }, 10000); // 10s lifespan, matching max duration
        };

        // Set an interval to continuously create falling items every 300ms
        const intervalId = setInterval(createFallingItem, 300);

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
