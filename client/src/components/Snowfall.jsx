import React, { useEffect, useState } from 'react';
import './snowflakes.css'; // Import your CSS

const Snowfall = () => {
    const [snowflakes, setSnowflakes] = useState([]);

    useEffect(() => {
        const createSnowflakes = () => {
            const flakes = [];
            for (let i = 0; i < 50; i++) { // Adjust number of flakes as needed
                flakes.push({
                    id: i,
                    left: Math.random(),
                    size: `${Math.random() * 2 + 0.5}rem`, // Random size between 0.5rem to 2.5rem
                    duration: `${Math.random() * 5 + 5}s`, // Duration between 5s and 10s
                    delay: `${Math.random() * 5}s`, // Random delay
                });
            }
            setSnowflakes(flakes);
        };

        createSnowflakes();
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
