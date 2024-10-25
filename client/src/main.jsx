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
        background: 'linear-gradient(to bottom, #ADD8E6, #F0F8FF)',
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
      },
      input: {
        border: '1px solid #D3D3D3',
        borderRadius: '6px',
      },
    },
  },
});

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </ApolloProvider>
  </React.StrictMode>
);
