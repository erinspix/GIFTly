import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyle from './styles/globalStyles'; // Adjust if using styled-components

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle /> {/* Add global styles */}
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
