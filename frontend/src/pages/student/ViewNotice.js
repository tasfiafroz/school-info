import React, { useEffect, useState } from 'react';
import NoticeDetailsV from '../../components/NoticeDetailsV';
import './StuStyle.css';
import { Link, useParams } from 'react-router-dom';

const ViewNotice = () => {
    const [notices, setNotices] = useState([]);

    const { rollNum: paramRollNum } = useParams();
    const storedRollNum = localStorage.getItem('rollNum');
    const rollNum = paramRollNum || storedRollNum || '';

    // Fetch all notices
    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/notice');
                const json = await response.json();

                if (response.ok) {
                    setNotices(json);
                } else {
                    console.error('Failed to fetch notice details:', json);
                }
            } catch (error) {
                console.error('Error fetching notice details:', error);
            }
        };

        fetchNotices();
    }, []);

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
            <div>
                <h2 className='notice-h2'>Notices</h2>
                <div className='notice'>
                    {notices.map((notice) => (
                        <NoticeDetailsV
                            key={notice._id}
                            notice={notice}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ViewNotice;