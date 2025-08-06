import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { SidebarProvider } from './context/SidebarContext'; // if you have one
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <SidebarProvider>
        <App />
      </SidebarProvider>
    </AuthProvider>
  </React.StrictMode>
);
