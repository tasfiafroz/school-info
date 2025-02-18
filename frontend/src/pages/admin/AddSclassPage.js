import React, { useEffect, useState } from 'react';
import ClassForm from '../../components/ClassForm';
import Sidebar from '../../components/AdminNav';
import './style.css';

const AddSclassPage = () => {
    const [classDetails, setClassDetails] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null); 

    useEffect(() => {
        const fetchClassDetails = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/sclass');
                const json = await response.json();

                if (response.ok) {
                    setClassDetails(json);
                } else {
                    console.error('Failed to fetch class details:', json);
                }
            } catch (error) {
                console.error('Error fetching class details:', error);
            }
        };

        fetchClassDetails();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/sclass/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setClassDetails(classDetails.filter((classDetail) => classDetail._id !== id));
            } else {
                console.error('Failed to delete class');
            }
        } catch (error) {
            console.error('Error deleting class:', error);
        }
    };

    const handleUpdate = async (id, updatedData) => {
        try {
            const response = await fetch(`http://localhost:5000/api/sclass/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (response.ok) {
                const updatedClass = await response.json();
                setClassDetails(classDetails.map((classDetail) =>
                    classDetail._id === id ? updatedClass : classDetail
                ));
                setSelectedClass(null);
            } else {
                console.error('Failed to update class:', await response.json());
            }
        } catch (error) {
            console.error('Error updating class:', error);
        }
    };

    return (
        <div>
            <Sidebar />
            <div>
                <ClassForm />
                <div className='class'>
                    <h2>Class Details</h2>
                    
                    {/* Table for displaying class details */}
                    <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f2f2f2' }}>
                                <th>Class Name</th>
                                <th>Seat Capacity</th>
                                <th>Section</th>
                                <th>Room Number</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classDetails.map((classDetail) => (
                                <tr key={classDetail._id}>
                                    <td>{classDetail.sclassName}</td>
                                    <td>{classDetail.seatCapacity}</td>
                                    <td>{classDetail.section}</td>
                                    <td>{classDetail.roomNum}</td>
                                    <td>
                                        <button onClick={() => setSelectedClass(classDetail)} style={{ marginRight: '10px' }}>Update</button>
                                        <button onClick={() => handleDelete(classDetail._id)} style={{ backgroundColor: 'red', color: 'white' }}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Update Form */}
                    {selectedClass && (
                        <div className="update-form" style={{ marginTop: '20px' }}>
                            <h3>Update Class</h3>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const formData = new FormData(e.target);
                                    const updatedData = {
                                        sclassName: formData.get('sclassName'),
                                        seatCapacity: formData.get('seatCapacity'),
                                        section: formData.get('section'),
                                        roomNum: formData.get('roomNum'),
                                    };
                                    handleUpdate(selectedClass._id, updatedData);
                                }}
                            >
                                <label>Class Name: <input type="text" name="sclassName" defaultValue={selectedClass.sclassName} required /></label>
                                <label>Seat Capacity: <input type="number" name="seatCapacity" defaultValue={selectedClass.seatCapacity} required /></label>
                                <label>Section: <input type="text" name="section" defaultValue={selectedClass.section} required /></label>
                                <label>Room Number: <input type="number" name="roomNum" defaultValue={selectedClass.roomNum} required /></label>

                                <button type="submit">Save</button>
                                <button type="button" onClick={() => setSelectedClass(null)}>Cancel</button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddSclassPage;
