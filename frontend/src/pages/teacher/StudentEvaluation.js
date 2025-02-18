import React, { useState, useEffect } from 'react';
import './TeaStyle.css';  // Adjust if necessary
import { Link, useNavigate } from 'react-router-dom';

const StudentEvaluation = () => {
    const [rollNum, setRollNum] = useState('');
    const [evaluations, setEvaluations] = useState([]);
    const [feedback, setFeedback] = useState('');
    const [teacherName, setTeacherName] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const email = localStorage.getItem('email');

    // Handle change in roll number
    const handleRollNumChange = (e) => {
        setRollNum(e.target.value);
    };

    // Fetch evaluations when roll number changes
    useEffect(() => {
        if (rollNum) {
            const fetchEvaluations = async () => {
                try {
                    const response = await fetch(`http://localhost:5000/api/student/${rollNum}/evaluations`);
                    const json = await response.json();

                    console.log("Fetched Evaluations:", json); // Debugging log
                    console.log("Response Status:", response.status); // Debugging log

                    if (response.ok) {
                        setEvaluations(json);  // Assuming API returns an array
                        setError('');
                    } else {
                        setError('Failed to fetch evaluations.');
                        setEvaluations([]);
                    }
                } catch (err) {
                    console.error("Fetch Error:", err); // Debugging log
                    setError('Error fetching evaluations.');
                    setEvaluations([]);
                }
            };

            fetchEvaluations();
        }
    }, [rollNum]);

    // Add a new evaluation
    const handleAddEvaluation = async (e) => {
        e.preventDefault();

        if (!feedback || !teacherName) {
            setError('Both Feedback and Teacher Name are required');
            return;
        }

        if (!rollNum) {
            setError('Please enter a valid roll number.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/student/${rollNum}/evaluations`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ feedback, teacherName }), // Adjust payload if needed
            });
            const json = await response.json();

            console.log("Add Response:", json); // Debugging log
            console.log("Response Status:", response.status); // Debugging log

            if (response.ok) {
                setEvaluations([...evaluations, json]); // Assuming API returns the new evaluation
                setFeedback('');
                setTeacherName('');
                setMessage('Evaluation added successfully');
                setError('');
            } else {
                setError('Failed to add evaluation');
            }
        } catch (err) {
            console.error("Add Error:", err); // Debugging log
            setError('Error adding evaluation');
        }
    };

    // Update evaluations
    const handleUpdateEvaluations = async () => {
        if (evaluations.length === 0) {
            setError('No evaluations to update');
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:5000/api/student/${rollNum}/evaluations`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ evaluations }), // Send the entire array
            });
    
            if (response.ok) {
                setMessage('Evaluations updated successfully');
                setError('');
            } else {
                setError('Failed to update evaluations');
            }
        } catch (err) {
            setError('Error updating evaluations');
        }
    };

    // Delete all evaluations
    const handleDeleteEvaluations = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/student/${rollNum}/evaluations`, {
                method: 'DELETE',
            });

            console.log("Delete Response:", response); // Debugging log

            if (response.ok) {
                setEvaluations([]);
                setMessage('All evaluations deleted');
                setError('');
            } else {
                setError('Failed to delete evaluations');
            }
        } catch (err) {
            console.error("Delete Error:", err); // Debugging log
            setError('Error deleting evaluations');
        }
    };

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
<div className="evaluation-container">
    <h2>Student Evaluation</h2>
    <div className="evaluation-input-group">
        <label>Enter Roll Number:</label>
        <input
            type="number"
            value={rollNum}
            onChange={handleRollNumChange}
            placeholder="Enter roll number"
            required
        />
    </div>
    <div className="evaluation-list">
        <h3>Current Evaluations:</h3>
        {evaluations.length > 0 ? (
            <ul>
                {evaluations.map((evalItem, index) => (
                    <li key={index}>
                        <strong>Feedback:</strong> {evalItem.feedback} <br />
                        <strong>Teacher:</strong> {evalItem.teacherName}
                    </li>
                ))}
            </ul>
        ) : (
            <p>No evaluations found.</p>
        )}
    </div>
    <div className="evaluation-input-group">
        <label>Feedback:</label>
        <input
            type="text"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Enter feedback"
        />
        <label>Teacher Name:</label>
        <input
            type="text"
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
            placeholder="Enter teacher name"
        />
        <button className="evaluation-button" onClick={handleAddEvaluation}>Add Evaluation</button>
    </div>
    <div className="evaluation-buttons">
        <button className="evaluation-button" onClick={handleUpdateEvaluations}>Update Evaluations</button>
        <button className="evaluation-button" onClick={handleDeleteEvaluations}>Delete All Evaluations</button>
    </div>
    {error && <div className="evaluation-error">{error}</div>}
    {message && <div className="evaluation-message">{message}</div>}
</div>
</div>
    );
};

export default StudentEvaluation;