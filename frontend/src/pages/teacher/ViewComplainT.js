import React, { useEffect, useState } from 'react';
import ComplainDetailsV from '../../components/ComplainDetailsV';
import './TeaStyle.css';
import { Link, useParams } from 'react-router-dom';

const ViewComplainT = () => {
    const [complains, setComplains] = useState([]);

    const email = localStorage.getItem('email');


    // Fetch all complains
    useEffect(() => {
        const fetchComplains = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/complain');
                const json = await response.json();

                if (response.ok) {
                    setComplains(json);
                } else {
                    console.error('Failed to fetch complain details:', json);
                }
            } catch (error) {
                console.error('Error fetching complain details:', error);
            }
        };

        fetchComplains();
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
                <h2 className='view-complain-h2'>Complaints</h2>
                <div className='view-complain'>
                    {complains.map((complain) => (
                        <div key={complain._id} className="view-complain-item">
                            <ComplainDetailsV
                                complain={complain}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ViewComplainT;
