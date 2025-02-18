import { Link } from "react-router-dom";
import './Sidebar.css';

const SidebarS = ({ rollNum }) => {
  return (
    <div className="sidebar">
      <h2>Student Panel</h2>
      <ul>
        <li><Link to={`/student/StudentDashboard/${rollNum}`}>Dashboard</Link></li>
        <li><Link to={`/student/profile/${rollNum}`}>Profile</Link></li>
        <li><Link to="/Teacher">Teachers</Link></li>
        <li><Link to="/Class">Class</Link></li>
        <li><Link to="/Subject">Subject</Link></li>
        <li><Link to="/Notice">Notice</Link></li>
      </ul>
    </div>
  );
};

export default SidebarS;
