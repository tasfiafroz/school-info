import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import Sidebar from '../../components/AdminNav';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/'); 
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
        <header>
          <h1>Welcome, Admin!</h1>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </header>
      </div>
    </div>
  );
};

export default AdminDashboard;

