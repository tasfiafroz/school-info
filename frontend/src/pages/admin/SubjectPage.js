import React, { useEffect, useState } from 'react';
import SubjectForm from '../../components/SubjectForm';
import Sidebar from '../../components/AdminNav';
import './style.css';

const SubjectPage = () => {
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState(null);

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/subject');
                const json = await response.json();

                if (response.ok) {
                    setSubjects(json);
                } else {
                    console.error('Failed to fetch subject details:', json);
                }
            } catch (error) {
                console.error('Error fetching subject details:', error);
            }
        };

        fetchSubjects();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/subject/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setSubjects(subjects.filter((subject) => subject._id !== id));
            } else {
                console.error('Failed to delete subject');
            }
        } catch (error) {
            console.error('Error deleting subject:', error);
        }
    };

    const handleUpdate = async (id, updatedData) => {
        try {
            const response = await fetch(`http://localhost:5000/api/subject/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (response.ok) {
                const updatedSubject = await response.json();
                setSubjects(subjects.map((subject) =>
                    subject._id === id ? updatedSubject : subject
                ));
                setSelectedSubject(null);
            } else {
                console.error('Failed to update subject:', await response.json());
            }
        } catch (error) {
            console.error('Error updating subject:', error);
        }
    };

    return (
        <div>
            <Sidebar />
            <div>
                <SubjectForm />
                <div className='subject'>
                    <h2>Subject Details</h2>

                    {/* Table for displaying subjects */}
                    <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f2f2f2' }}>
                                <th>Subject Name</th>
                                <th>Subject Code</th>
                                <th>Class</th>
                                <th>Teacher</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subjects.map((subject) => (
                                <tr key={subject._id}>
                                    <td>{subject.subName}</td>
                                    <td>{subject.subCode}</td>
                                    <td>{subject.sclassName}</td>
                                    <td>{subject.teacher}</td>
                                    <td>
                                        <button onClick={() => setSelectedSubject(subject)} style={{ marginRight: '10px' }}>Update</button>
                                        <button onClick={() => handleDelete(subject._id)} style={{ backgroundColor: 'red', color: 'white' }}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Update Form */}
                    {selectedSubject && (
                        <div className="update-formS" style={{ marginTop: '20px' }}>
                            <h3>Update Subject</h3>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const formData = new FormData(e.target);
                                    const updatedData = {
                                        subName: formData.get('subName'),
                                        subCode: formData.get('subCode'),
                                        sclassName: formData.get('sclassName'),
                                        teacher: formData.get('teacher'),
                                    };
                                    handleUpdate(selectedSubject._id, updatedData);
                                }}
                            >
                                <label>Subject Name: <input type="text" name="subName" defaultValue={selectedSubject.subName} required /></label>
                                <label>Subject Code: <input type="text" name="subCode" defaultValue={selectedSubject.subCode} required /></label>
                                <label>Class: <input type="text" name="sclassName" defaultValue={selectedSubject.sclassName} required /></label>
                                <label>Teacher: <input type="text" name="teacher" defaultValue={selectedSubject.teacher} required /></label>

                                <button type="submit">Save</button>
                                <button type="button" onClick={() => setSelectedSubject(null)}>Cancel</button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SubjectPage;
