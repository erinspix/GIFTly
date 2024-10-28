import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_live_51QCrugIBf2gLLBbj6wW5YhLUiggTaQL59LQWzG36IMVUOhwZhVwQirf4mWb8SyT7dCktAJsozgXxYlY6t2bRQH6Z00dLG3UVSa');

const StripeProvider = ({ children }) => {
  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
};

export default StripeProvider;
