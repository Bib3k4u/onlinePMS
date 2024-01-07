import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import { UserManagement } from './StateManagement/UserManagement';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserManagement>
    <App />
    </UserManagement>
  </React.StrictMode>
);


