import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Result = () => {
    const { rollNum: paramRollNum } = useParams(); // Get rollNum from URL
    const storedRollNum = localStorage.getItem("rollNum"); // Get rollNum from localStorage
    const rollNum = paramRollNum || storedRollNum || ""; // Use URL rollNum, fallback to localStorage

    const [examResults, setExamResults] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        if (rollNum) {
            fetchResults();
        }
    }, [rollNum]); // Fetch results when rollNum changes

    const fetchResults = async () => {
        setError(""); // Clear previous errors
        try {
            const response = await axios.get(`http://localhost:5000/api/student/exam-result/${rollNum}`);
            setExamResults(response.data.examResult);
        } catch (err) {
            setError("Student not found or server error");
            setExamResults([]);
        }
    };

    return (
        <div>
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
        <div className="sr">
            <h2>View Exam Results</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {examResults.length > 0 ? (
                <table border="1">
                    <thead>
                        <tr>
                            <th>Exam Name</th>
                            <th>Subject</th>
                            <th>Marks Obtained</th>
                        </tr>
                    </thead>
                    <tbody>
                        {examResults.map((exam, index) => (
                            <tr key={index}>
                                <td>{exam.examName}</td>
                                <td>{exam.subName}</td>
                                <td>{exam.marksObtained}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No exam results found.</p>
            )}
        </div>
        </div>
    );
};

export default Result;
