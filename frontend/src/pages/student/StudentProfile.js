import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import './StudentProfile.css';
import { Link } from 'react-router-dom';

const StudentProfile = () => {
    const { rollNum: paramRollNum } = useParams();
    const storedRollNum = localStorage.getItem('rollNum');
    const rollNum = paramRollNum || storedRollNum || '';

    const [student, setStudent] = useState(null);
    const [evaluations, setEvaluations] = useState([]); // New state for evaluations
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!rollNum) {
            setError('Roll number not found.');
            setLoading(false);
            return;
        }

        const fetchStudentProfile = async () => {
            try {
                // Fetch student profile
                const profileResponse = await fetch(`http://localhost:5000/api/student/profile/${rollNum}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('studentToken')}`
                    },
                });

                if (!profileResponse.ok) {
                    const errorText = await profileResponse.text();
                    throw new Error(errorText || 'Failed to fetch profile');
                }

                const profileData = await profileResponse.json();
                setStudent(profileData);

                // Fetch evaluations for the student
                const evaluationsResponse = await fetch(`http://localhost:5000/api/student/${rollNum}/evaluations`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('studentToken')}`
                    },
                });

                if (!evaluationsResponse.ok) {
                    const errorText = await evaluationsResponse.text();
                    throw new Error(errorText || 'Failed to fetch evaluations');
                }

                const evaluationsData = await evaluationsResponse.json();
                setEvaluations(evaluationsData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStudentProfile();
    }, [rollNum]);

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;
    if (!student) return <Typography>No student data found.</Typography>;

    return (
        <div className="student-profile-container">
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
            <div className="content">
                <Typography variant="h4">Student Profile</Typography>
                <Paper elevation={3} className="paper">
                    <Typography variant="h6">Basic Information</Typography>
                    <Typography>Name: {student.name}</Typography>
                    <Typography>Roll Number: {student.rollNum}</Typography>
                    <Typography>Class: {student.sclassName}</Typography>
                    <Typography>Role: {student.role}</Typography>
                </Paper>

                

                {/* Display Evaluations */}
                <Typography variant="h5" style={{ marginTop: '20px' }}>Evaluations</Typography>
                <TableContainer component={Paper} className="table-container">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Feedback</TableCell>
                                <TableCell>Teacher Name</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {evaluations.length > 0 ? (
                                evaluations.map((evaluation, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{evaluation.feedback}</TableCell>
                                        <TableCell>{evaluation.teacherName}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={2} align="center">No evaluations found.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default StudentProfile;