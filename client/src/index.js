import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import { EmailValidateSate } from './StateManagements/EmailValidState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <EmailValidateSate>
    <App />
    </EmailValidateSate>
  </React.StrictMode>
);


