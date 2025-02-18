import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const rollNum = localStorage.getItem('rollNum');

  const handleLogout = () => {
    localStorage.removeItem('studentToken');  // Clear token
    localStorage.removeItem('rollNum');  // Clear roll number
    navigate('/');  // Redirect to login page
  };

  return (
    <div className="student-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Student Panel</h2>
        <ul>
          <li><Link to={`/student/StudentDashboard/${rollNum}`}>Dashboard</Link></li>
          <li><Link to={`/student/profile/${rollNum}`}>Profile</Link></li>
          <li><Link to={`/student/Result/${rollNum}`}>Result</Link></li>
          <li><Link to="/student/ComplainPage">Complaint</Link></li>
          <li><Link to="/student/TeacherPageS">Teachers</Link></li>
          <li><Link to="/student/ViewNotice">Notice</Link></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header>
          <h1>Welcome, Student!</h1>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </header>
      </div>
    </div>
  );
};

export default StudentDashboard;
