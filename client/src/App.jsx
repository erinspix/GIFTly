import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Collection from './pages/Collection';
import ItemDetail from './pages/ItemDetail';
import Login from './pages/Login';
import './App.css';
import './components/PaymentForm.css';  // Import the CSS file

const stripePromise = loadStripe('pk_live_51QCrugIBf2gLLBbj6wW5YhLUiggTaQL59LQWzG36IMVUOhwZhVwQirf4mWb8SyT7dCktAJsozgXxYlY6t2bRQH6Z00dLG3UVSa');

const PaymentForm = React.lazy(() => import('./components/PaymentForm'));

const httpLink = createHttpLink({ uri: '/graphql' });

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {
  const [user, setUser] = useState();

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Elements stripe={stripePromise}>
          <Router>
            <Navbar />
            <main className='wrapper'>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/collection" element={<Collection />} />
                <Route path="/item/:id" element={<ItemDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/payment" element={<React.Suspense fallback={<div>Loading...</div>}><PaymentForm /></React.Suspense>} />
              </Routes>
              <Outlet />
            </main>
          </Router>
        </Elements>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
