import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">CEUSC</div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/admission">Admission</Link>
        </li>
        <li>
          <Link to="/about">About Us</Link>
        </li>
        <li className="dropdown">
          Information
          <ul className="dropdown-menu">
            <li><Link to="/information/teachers">Teachers</Link></li>
            <li><Link to="/information/students">Students</Link></li>
            <li><Link to="/information/officials">Officials</Link></li>
            <li><Link to="/information/staffs">Staffs</Link></li>
            <li><Link to="/information/governing-body">Governing Body</Link></li>
            <li><Link to="/information/classroom">Classroom</Link></li>
            <li><Link to="/information/others">Others</Link></li>
          </ul>
        </li>
        <li className="dropdown">
          Academic
          <ul className="dropdown-menu">
            <li><Link to="/academic/class-routine">Class Routine</Link></li>
            <li><Link to="/academic/academic-books">Academic Books</Link></li>
          </ul>
        </li>
        <li>
          <Link to="/notices">Notices</Link>
        </li>
        <li>
          <Link to="/online-classroom">Online Classroom</Link>
        </li>
        <li>
          <Link to="/Homepage">Sign In</Link>
        </li>
        
      </ul>
    </nav>
  );
}

export default Navbar;
