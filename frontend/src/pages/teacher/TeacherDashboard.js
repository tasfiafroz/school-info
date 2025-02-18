import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './TeacherDashboard.css';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem('email');

  const handleLogout = () => {
    localStorage.removeItem('studentToken'); 
    localStorage.removeItem('email');  
    navigate('/');  
  };

  return (
    <div className="teacher-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Teacher Panel</h2>
        <ul>
          <li><Link to={`/teacher/TeacherDashboard/${email}`}>Dashboard</Link></li>
          <li><Link to="/teacher/TeacherDashboard/StudentPageT/">Students</Link></li>
          <li><Link to="/teacher/TeacherDashboard/TeacherPageT/">Teachers</Link></li>
          <li><Link to="/teacher/TeacherDashboard/ViewComplainT/">Complaints</Link></li>
          <li><Link to="/teacher/TeacherDashboard/StudentEvaluation/">Student Evaluation</Link></li>
          <li><Link to="/teacher/TeacherDashboard/ViewNoticeT/">Notice</Link></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header>
          <h1>Welcome, Teacher!</h1>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </header>
      </div>
    </div>
  );
};

export default TeacherDashboard;

