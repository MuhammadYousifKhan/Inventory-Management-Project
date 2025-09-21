import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './components/Admin/Dashboard';
import ManagerDashboard from './components/Manager/Dashboard';

function App() {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  const userRole = localStorage.getItem('userRole');

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={isAuthenticated ? 
            (userRole === 'admin' ? 
              <Navigate to="/admin" /> : 
              <Navigate to="/manager" />) : 
            <Login />} 
        />
        <Route 
          path="/admin" 
          element={isAuthenticated && userRole === 'admin' ? 
            <AdminDashboard /> : 
            <Navigate to="/" />} 
        />
        <Route 
          path="/manager" 
          element={isAuthenticated && userRole === 'manager' ? 
            <ManagerDashboard /> : 
            <Navigate to="/" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;