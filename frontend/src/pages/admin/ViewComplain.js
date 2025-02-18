import React, { useEffect, useState } from 'react';
import ComplainDetailsV from '../../components/ComplainDetailsV';
import './style.css';
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../../components/AdminNav';

const ViewComplain = () => {
    const [complains, setComplains] = useState([]);

    const { rollNum: paramRollNum } = useParams();
    const storedRollNum = localStorage.getItem('rollNum');
    const rollNum = paramRollNum || storedRollNum || '';

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

    // Handle delete complain
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/complain/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Remove the deleted complain from the state
                setComplains(complains.filter((complain) => complain._id !== id));
            } else {
                console.error('Failed to delete complain');
            }
        } catch (error) {
            console.error('Error deleting complain:', error);
        }
    };

    return (
        <div>
            <Sidebar />
            <div>
                <h2 className='view-complain-h2'>Complaints</h2>
                <div className='view-complain'>
                    {complains.map((complain) => (
                        <div key={complain._id} className="view-complain-item">
                            <ComplainDetailsV
                                complain={complain}
                            />
                            <button onClick={() => handleDelete(complain._id)} className="delete-btn">
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ViewComplain;
