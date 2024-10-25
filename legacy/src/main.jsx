import React from 'react';
import { createRoot } from 'react-dom/client'; // Fix createRoot import
import App from './App';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import { ChakraProvider } from '@chakra-ui/react';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
  <ApolloProvider client={client}>
      <ChakraProvider>
          <App />
      </ChakraProvider>
  </ApolloProvider>
</React.StrictMode>
)

