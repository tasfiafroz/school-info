import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Optional: Add specific styles for the sidebar

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li><Link to="/admin/AdminDashboard">Dashboard</Link></li>
        <li><Link to="/admin/AdminDashboard/StudentPage">Students</Link></li>
        <li><Link to="/admin/AdminDashboard/TeacherPage">Teachers</Link></li>
        <li><Link to="/admin/AdminDashboard/AddSclassPage">Class</Link></li>
        <li><Link to="/admin/AdminDashboard/SubjectPage">Subject</Link></li>
        <li><Link to="/admin/AdminDashboard/NoticePage">Notice</Link></li>
        <li><Link to="/admin/AdminDashboard/ResultForm">Result</Link></li>
        <li><Link to="/admin/AdminDashboard/ViewComplain">Complaints</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;