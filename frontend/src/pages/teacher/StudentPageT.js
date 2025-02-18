import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './TeaStyle.css';

const StudentPage = () => {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewStudent, setViewStudent] = useState(null);

    const email = localStorage.getItem('email');

    // Fetch students from API
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/student');
                const data = await response.json();
                if (response.ok) {
                    setStudents(data);
                } else {
                    console.error('Failed to fetch students:', data);
                }
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, []);

    // Filter students based on search term
    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(student.rollNum).toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.sclassName.toLowerCase().includes(searchTerm.toLowerCase())
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
                <div className="stu">
                    <h2>Student Details</h2>

                    {/* Search Bar */}
                    <input
                        type="text"
                        placeholder="Search by Name, Roll No. or Class"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />

                    <table className="student-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Father's Name</th>
                                <th>Mother's Name</th>
                                <th>Mobile</th>
                                <th>Roll No.</th>
                                <th>Class</th>
                                <th>Gender</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map((student) => (
                                <tr key={student._id}>
                                    <td>{student.name}</td>
                                    <td>{student.Fname}</td>
                                    <td>{student.Mname}</td>
                                    <td>{student.mobile}</td>
                                    <td>{student.rollNum}</td>
                                    <td>{student.sclassName}</td>
                                    <td>{student.gender}</td>
                                    <td className="action-buttons">
                                        <button className="view-btn" onClick={() => setViewStudent(student)}>View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Student Details Modal */}
                    {viewStudent && (
                        <div className="modal">
                            <div className="modal-content">
                                <span className="close-btn" onClick={() => setViewStudent(null)}>&times;</span>
                                <h2>Student Details</h2>
                                <p><strong>Name:</strong> {viewStudent.name}</p>
                                <p><strong>Father's Name:</strong> {viewStudent.Fname}</p>
                                <p><strong>Mother's Name:</strong> {viewStudent.Mname}</p>
                                <p><strong>Mobile:</strong> {viewStudent.mobile}</p>
                                <p><strong>Roll Number:</strong> {viewStudent.rollNum}</p>
                                <p><strong>Class:</strong> {viewStudent.sclassName}</p>
                                <p><strong>Gender:</strong> {viewStudent.gender}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentPage;
