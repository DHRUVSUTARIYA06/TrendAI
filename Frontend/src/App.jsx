import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import AppRoutes from './routes';
import { ToastProvider } from './context/ToastContext';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => Boolean(localStorage.getItem('trendai_admin_key'))
  );

  const handleLogout = () => {
    localStorage.removeItem('trendai_admin_key');
    setIsAuthenticated(false);
  };

  return (
    <ThemeProvider>
      {!isAuthenticated ? (
        <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />
      ) : (
        <BrowserRouter>
          <ToastProvider>
            <AppRoutes onLogout={handleLogout} />
          </ToastProvider>
        </BrowserRouter>
      )}
    </ThemeProvider>
  );
}
