import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../src/App';
import './index.css';
import { AuthContextProvider } from './contexts/AuthContext';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
