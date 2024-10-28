import React, { useState } from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet
import Navbar from './components/Navbar';
import { loadStripe } from '@stripe/stripe-js';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { AuthProvider } from './context/AuthContext';
import './App.css';

const stripePromise = loadStripe('pk_live_51QCrugIBf2gLLBbj6wW5YhLUiggTaQL59LQWzG36IMVUOhwZhVwQirf4mWb8SyT7dCktAJsozgXxYlY6t2bRQH6Z00dLG3UVSa');

const httpLink = createHttpLink({ 
  uri: '/graphql'
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {
  const [user, setUser] = useState();

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Navbar />
        <main className='wrapper'>
          <Outlet /> {/* This renders the child routes */}
        </main>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;



