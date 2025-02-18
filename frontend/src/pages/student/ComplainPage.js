import React, { useEffect, useState } from 'react';
import ComplainForm from '../../components/ComplainForm'; // Assuming ComplainForm is already created
import ComplainDetails from '../../components/ComplainDetails'; // Assuming ComplainDetails is created
import { Link, useNavigate, useParams } from 'react-router-dom';
import './StuStyle.css';

const ComplainPage = () => {
    const [complains, setComplains] = useState([]);
    const [selectedComplain, setSelectedComplain] = useState(null); // For update functionality

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

    // Handle update complain
    const handleUpdate = async (id, updatedData) => {
        try {
            const response = await fetch(`http://localhost:5000/api/complain/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (response.ok) {
                const updatedComplain = await response.json();
                // Update the complain in the state
                setComplains(complains.map((complain) =>
                    complain._id === id ? updatedComplain : complain
                ));
                setSelectedComplain(null); // Close the update form
            } else {
                console.error('Failed to update complain:', await response.json());
            }
        } catch (error) {
            console.error('Error updating complain:', error);
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
            <div>
                <h2 className='complain-h2'>Complains</h2>
                <div className='complain'>
                    {complains.map((complain) => (
                        <ComplainDetails
                            key={complain._id}
                            complain={complain}
                            onDelete={() => handleDelete(complain._id)}
                            onUpdate={() => setSelectedComplain(complain)} // Pass the complain to update
                        />
                    ))}
                </div>

                {/* Update Form */}
                {selectedComplain && (
                    <div className="complain-form">
                        <h3>Update Complain</h3>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.target);
                                const updatedData = {
                                    title: formData.get('title'),
                                    details: formData.get('details'),
                                    date: formData.get('date'),
                                    status: formData.get('status'), // assuming status field is there in schema
                                };
                                handleUpdate(selectedComplain._id, updatedData);
                            }}
                        >
                            <label>
                                Title:
                                <input
                                    type="text"
                                    name="title"
                                    defaultValue={selectedComplain.title}
                                    required
                                />
                            </label>
                            <label>
                                Details:
                                <textarea
                                    name="details"
                                    defaultValue={selectedComplain.details}
                                    required
                                />
                            </label>
                            <label>
                                Date:
                                <input
                                    type="date"
                                    name="date"
                                    defaultValue={new Date(selectedComplain.date).toISOString().split('T')[0]}
                                    required
                                />
                            </label>
                            <label>
                                Status:
                                <select name="status" defaultValue={selectedComplain.status}>
                                    <option value="Pending">Pending</option>
                                    <option value="Resolved">Resolved</option>
                                    <option value="In Progress">In Progress</option>
                                </select>
                            </label>
                            <button type="submit">Save</button>
                            <button type="button" onClick={() => setSelectedComplain(null)}>
                                Cancel
                            </button>
                        </form>
                    </div>
                )}

                <ComplainForm />
            </div>
        </div>
    );
};

export default ComplainPage;
