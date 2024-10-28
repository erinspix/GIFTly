app.jsx
import React, { useContext, useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const themes = [
  { name: "goldSnowTheme", cssFile: 'css/goldSnowTheme.css' },
  { name: "presentTheme", cssFile: 'css/goldSnowPresent.css' },
  { name: "snowflakeTheme", cssFile: 'css/largeFlakeTheme.css' },
  { name: "treeBranchTheme", cssFile: 'css/snowyTreeTheme.css' },
  { name: "snowmenTheme", cssFile: 'css/snowmenTheme.css' }
];

const stripePromise = loadStripe('your_publishable_key');

const ThemeContext = React.createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes[0]);

  useEffect(() => {
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    setTheme(randomTheme);
  }, []);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const theme = useContext(ThemeContext);

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

const App = () => {
  const theme = useContext(ThemeContext);

  return (
    <ThemeProvider>
      <Elements stripe={stripePromise}>
        <link rel="stylesheet" href={theme.cssFile} />
        <h1>Giftly - Winter Wonderland</h1>
        <PaymentForm />
      </Elements>
    </ThemeProvider>
  );
};

export default App;