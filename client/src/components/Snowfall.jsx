import React, { useEffect, useState } from 'react';
import './snowflakes.css'; // Import your CSS

const Snowfall = () => {
    const [snowflakes, setSnowflakes] = useState([]);

    useEffect(() => {
        const createSnowflake = () => {
            // Create a new snowflake with random properties
            const newFlake = {
                id: Math.random(), // Unique ID
                left: Math.random(), // Random horizontal position
                size: `${Math.random() * 2 + 0.5}rem`, // Random size between 0.5rem to 2.5rem
                duration: `${Math.random() * 5 + 5}s`, // Random duration between 5s to 10s
                delay: '0s', // No initial delay for each snowflake
            };

            // Add the new snowflake to the list
            setSnowflakes((prevFlakes) => [...prevFlakes, newFlake]);

            // Remove the snowflake after it reaches the bottom
            setTimeout(() => {
                setSnowflakes((prevFlakes) =>
                    prevFlakes.filter((flake) => flake.id !== newFlake.id)
                );
            }, 10000); // 10s lifespan, matching max duration
        };

        // Set an interval to continuously create snowflakes every 200ms
        const intervalId = setInterval(createSnowflake, 200);

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);

    return (
        <div className="snow-container">
            {snowflakes.map((flake) => (
                <div
                    key={flake.id}
                    className="snowflake"
                    style={{
                        '--left': flake.left,
                        '--size': flake.size,
                        '--duration': flake.duration,
                        '--delay': flake.delay,
                    }}
                >
                    ❄
                </div>
            ))}
        </div>
    );
};

export default Snowfall;
