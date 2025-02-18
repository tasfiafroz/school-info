import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './TeaStyle.css';

const TeacherPageT = () => {
    const [teachers, setTeachers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [viewTeacher, setViewTeacher] = useState(null);

    const email = localStorage.getItem('email');

    // Fetch all teachers
    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/teacher');
                const json = await response.json();

                if (response.ok) {
                    setTeachers(json);
                } else {
                    console.error('Failed to fetch teacher details:', json);
                }
            } catch (error) {
                console.error('Error fetching teacher details:', error);
            }
        };

        fetchTeachers();
    }, []);

    // Filter teachers based on searchTerm
    const filteredTeachers = teachers.filter(teacher =>
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.teachSubject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(teacher.mobile).toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
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
            <div>
                <div className="tea">
                    <h2>Teacher Details</h2>

                    {/* Search Bar */}
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search by Name, Email, Subject, or Mobile..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                    </div>

                    <div className="class">
                        <table className="teacher-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Subject</th>
                                    <th>Date of Birth</th>
                                    <th>Join Date</th>
                                    <th>Mobile</th>
                                    <th>Address</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTeachers.map((teacher) => (
                                    <tr key={teacher._id}>
                                        <td>{teacher.name}</td>
                                        <td>{teacher.email}</td>
                                        <td>{teacher.teachSubject}</td>
                                        <td>{teacher.dob ? new Date(teacher.dob).toLocaleDateString() : 'N/A'}</td>
                                        <td>{teacher.JoinDate ? new Date(teacher.JoinDate).toLocaleDateString() : 'N/A'}</td>
                                        <td>{teacher.mobile || 'N/A'}</td>
                                        <td>{teacher.address || 'N/A'}</td>
                                        <td className="action-buttons">
                                            <button className="details-btn" onClick={() => setViewTeacher(teacher)}>View</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* View Details Modal */}
                    {viewTeacher && (
                        <div className="modal">
                            <div className="modal-content">
                                <span className="close-btn" onClick={() => setViewTeacher(null)}>&times;</span>
                                <h2>Teacher Details</h2>
                                <p><strong>Name:</strong> {viewTeacher.name}</p>
                                <p><strong>Email:</strong> {viewTeacher.email}</p>
                                <p><strong>Subject:</strong> {viewTeacher.teachSubject}</p>
                                <p><strong>Date of Birth:</strong> {viewTeacher.dob ? new Date(viewTeacher.dob).toLocaleDateString() : 'N/A'}</p>
                                <p><strong>Join Date:</strong> {viewTeacher.JoinDate ? new Date(viewTeacher.JoinDate).toLocaleDateString() : 'N/A'}</p>
                                <p><strong>Mobile:</strong> {viewTeacher.mobile || 'N/A'}</p>
                                <p><strong>Address:</strong> {viewTeacher.address || 'N/A'}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TeacherPageT;
