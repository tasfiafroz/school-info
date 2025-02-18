import React, { useEffect, useState } from 'react';
import TeacherForm from '../../components/TeacherForm';
import './style.css';
import Sidebar from '../../components/AdminNav';

const TeacherPage = () => {
    const [teachers, setTeachers] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // State for search input
    const [selectedTeacher, setSelectedTeacher] = useState(null); // For update functionality
    const [viewTeacher, setViewTeacher] = useState(null); // For viewing details

    // Fetch all teachers
    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/teacher');
                const json = await response.json();

                if (response.ok) {
                    setTeachers(json);
                } else {
                    console.error('Failed to fetch teacher details:', json);
                }
            } catch (error) {
                console.error('Error fetching teacher details:', error);
            }
        };

        fetchTeachers();
    }, []);

    // Handle delete teacher
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/teacher/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setTeachers(teachers.filter((teacher) => teacher._id !== id));
            } else {
                console.error('Failed to delete teacher');
            }
        } catch (error) {
            console.error('Error deleting teacher:', error);
        }
    };

    // Handle update teacher
    const handleUpdate = async (id, updatedData) => {
        try {
            const response = await fetch(`http://localhost:5000/api/teacher/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (response.ok) {
                const updatedTeacher = await response.json();
                setTeachers(teachers.map((teacher) =>
                    teacher._id === id ? updatedTeacher : teacher
                ));
                setSelectedTeacher(null); // Close the update form
            } else {
                console.error('Failed to update teacher:', await response.json());
            }
        } catch (error) {
            console.error('Error updating teacher:', error);
        }
    };

    // Filter teachers based on searchTerm
    const filteredTeachers = teachers.filter(teacher =>
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.teachSubject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(teacher.mobile).toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <Sidebar />
            <div>
               

                <div className="tea">
                    <h2>Teacher Details</h2>

                    {/* Search Bar */}
                    <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search by Name, Email, Subject, or Mobile..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>


                    <div className="class">
                        <table className="teacher-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Subject</th>
                                    <th>Date of Birth</th>
                                    <th>Join Date</th>
                                    <th>Mobile</th>
                                    <th>Address</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTeachers.map((teacher) => (
                                    <tr key={teacher._id}>
                                        <td>{teacher.name}</td>
                                        <td>{teacher.email}</td>
                                        <td>{teacher.teachSubject}</td>
                                        <td>{teacher.dob ? new Date(teacher.dob).toLocaleDateString() : 'N/A'}</td>
                                        <td>{teacher.JoinDate ? new Date(teacher.JoinDate).toLocaleDateString() : 'N/A'}</td>
                                        <td>{teacher.mobile || 'N/A'}</td>
                                        <td>{teacher.address || 'N/A'}</td>
                                        <td className="action-buttons">
                                            <button className="details-btn" onClick={() => setViewTeacher(teacher)}>Details</button>
                                            <button className="edit-btn" onClick={() => setSelectedTeacher(teacher)}>Edit</button>
                                            <button className="delete-btn" onClick={() => handleDelete(teacher._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* View Details Modal */}
                    {viewTeacher && (
                        <div className="modal">
                            <div className="modal-content">
                                <span className="close-btn" onClick={() => setViewTeacher(null)}>&times;</span>
                                <h2>Teacher Details</h2>
                                <p><strong>Name:</strong> {viewTeacher.name}</p>
                                <p><strong>Email:</strong> {viewTeacher.email}</p>
                                <p><strong>Subject:</strong> {viewTeacher.teachSubject}</p>
                                <p><strong>Date of Birth:</strong> {viewTeacher.dob ? new Date(viewTeacher.dob).toLocaleDateString() : 'N/A'}</p>
                                <p><strong>Join Date:</strong> {viewTeacher.JoinDate ? new Date(viewTeacher.JoinDate).toLocaleDateString() : 'N/A'}</p>
                                <p><strong>Mobile:</strong> {viewTeacher.mobile || 'N/A'}</p>
                                <p><strong>Address:</strong> {viewTeacher.address || 'N/A'}</p>
                            </div>
                        </div>
                    )}

                    {/* Update Form */}
                    {selectedTeacher && (
                        <div className="update-formT">
                            <h3>Update Teacher</h3>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const formData = new FormData(e.target);
                                    const updatedData = {
                                        name: formData.get('name'),
                                        email: formData.get('email'),
                                        teachSubject: formData.get('teachSubject'),
                                        dob: formData.get('dob'),
                                        JoinDate: formData.get('JoinDate'),
                                        mobile: formData.get('mobile'),
                                        address: formData.get('address'),
                                    };
                                    handleUpdate(selectedTeacher._id, updatedData);
                                }}
                            >
                                <label>
                                    Name:
                                    <input type="text" name="name" defaultValue={selectedTeacher.name} required />
                                </label>
                                <label>
                                    Email:
                                    <input type="email" name="email" defaultValue={selectedTeacher.email} required />
                                </label>
                                <label>
                                    Subject:
                                    <input type="text" name="teachSubject" defaultValue={selectedTeacher.teachSubject} required />
                                </label>
                                <label>
                                    Date of Birth:
                                    <input type="date" name="dob" defaultValue={selectedTeacher.dob ? selectedTeacher.dob.split('T')[0] : ''} />
                                </label>
                                <label>
                                    Join Date:
                                    <input type="date" name="JoinDate" defaultValue={selectedTeacher.JoinDate ? selectedTeacher.JoinDate.split('T')[0] : ''} />
                                </label>
                                <label>
                                    Mobile:
                                    <input type="number" name="mobile" defaultValue={selectedTeacher.mobile || ''} />
                                </label>
                                <label>
                                    Address:
                                    <input type="text" name="address" defaultValue={selectedTeacher.address || ''} />
                                </label>
                                <button type="submit">Save</button>
                                <button type="button" onClick={() => setSelectedTeacher(null)}>Cancel</button>
                            </form>
                        </div>
                    )}
                </div>
                <TeacherForm />
            </div>
        </div>
    );
};

export default TeacherPage;
