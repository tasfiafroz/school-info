import React, { useEffect, useState } from 'react';
import NoticeDetailsV from '../../components/NoticeDetailsV';
import './TeaStyle.css';
import { Link, useParams } from 'react-router-dom';

const ViewNoticeT = () => {
    const [notices, setNotices] = useState([]);

    const email = localStorage.getItem('email');

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

export default ViewNoticeT;