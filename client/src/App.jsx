import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Collection from './pages/Collection';
import ItemDetail from './pages/ItemDetail';
import Login from './pages/Login';
import React, { useContext, useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './styles/paymentForm.css'

import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from '@apollo/client'

import { AuthProvider } from './context/AuthContext';

import './App.css'

const stripePromise = loadStripe('pk_live_51QCrugIBf2gLLBbj6wW5YhLUiggTaQL59LQWzG36IMVUOhwZhVwQirf4mWb8SyT7dCktAJsozgXxYlY6t2bRQH6Z00dLG3UVSa');

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const { error, token } = await stripe.createToken(cardElement);

    if (error) {
      console.error(error);
    } else {
      fetch('/charge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source: token.id, amount: 2000 })
      })
      .then(response => response.json())
      .then(data => console.log('Payment successful:', data))
      .catch(error => console.error('Error:', error));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

const httpLink = createHttpLink({ 
  uri: '/graphql'
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

function App() {
  const [user, setUser] = useState()

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Navbar />
        <main className='wrapper'>
          <Outlet />
        </main>
      </AuthProvider>
    </ApolloProvider>
  )
}

export default App;