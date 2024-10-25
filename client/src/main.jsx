import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import './global.css';

// Extend Chakra theme to include global styles
const theme = extendTheme({
  styles: {
    global: {
      body: {
        background: 'linear-gradient(to bottom, #AEDFF7, #D6EAF8)', // Softer blue tones
        fontFamily: "'Poppins', sans-serif",
      },
      h1: { color: '#0A3D62' },
      h2: { color: '#0A3D62' },
      h3: { color: '#0A3D62' },
      h4: { color: '#0A3D62' },
      h5: { color: '#0A3D62' },
      h6: { color: '#0A3D62' },
      button: {
        borderRadius: '8px',
        fontWeight: 'bold',
        backgroundColor: '#AEDFF7',
        color: 'white',
      },
      input: {
        border: '1px solid #D3D3D3',
        borderRadius: '6px',
      },
    },
  },
});

// Snowflakes Component with random Christmas emoticons
const Snowflakes = () => {
  const emoticons = ['❄️', '🎄', '🎅', '🎁', '⛄']; // List of festive emoticons

  const snowflakes = Array.from({ length: 50 }).map((_, i) => (
    <div
      key={i}
      className="snowflake"
      style={{
        '--left': Math.random(), // Random horizontal position
        '--size': `${Math.random() * 2 + 0.5}em`, // Random size
        '--duration': `${Math.random() * 5 + 5}s`, // Random fall duration (5s to 10s)
        '--delay': `${Math.random() * 5}s`, // Random delay before start (0s to 5s)
      }}
    >
      {emoticons[Math.floor(Math.random() * emoticons.length)]} {/* Random emoticon */}
    </div>
  ));

  return <div className="snow-container">{snowflakes}</div>;
};

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <Snowflakes />
        <App />
      </ChakraProvider>
    </ApolloProvider>
  </React.StrictMode>
);
