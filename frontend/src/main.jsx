import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './utils/auth.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter> {/* Wrap the app with BrowserRouter */}
        <App />
        <Toaster />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);