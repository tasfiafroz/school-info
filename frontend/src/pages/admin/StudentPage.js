import React, { useEffect, useState } from 'react';
import StudentForm from '../../components/StudentForm';
import './style.css';
import Sidebar from '../../components/AdminNav';

const StudentPage = () => {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [viewStudent, setViewStudent] = useState(null);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/student');
                const data = await response.json();
                if (response.ok) {
                    setStudents(data);
                } else {
                    console.error('Failed to fetch students:', data);
                }
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/student/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setStudents(students.filter((student) => student._id !== id));
            } else {
                console.error('Failed to delete student');
            }
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    const handleUpdateClick = (student) => {
        setSelectedStudent(student);
    };

    const handleUpdateSubmit = async (updatedStudent) => {
        try {
            const response = await fetch(`http://localhost:5000/api/student/${updatedStudent._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedStudent),
            });

            if (response.ok) {
                const updatedData = await response.json();
                setStudents(students.map((student) =>
                    student._id === updatedData._id ? updatedData : student
                ));
                setSelectedStudent(null);
            } else {
                console.error('Failed to update student:', await response.json());
            }
        } catch (error) {
            console.error('Error updating student:', error);
        }
    };

    // Filter students based on search term
    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(student.rollNum).toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.sclassName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    

    return (
        <div>
            <Sidebar />
            <div>
                <div className="stu">
                    <h2>Student Details</h2>

                    {/* Search Bar */}
                    <input
                        type="text"
                        placeholder="Search by Name, Roll No. or Class"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />

                    <table className="student-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Father's Name</th>
                                <th>Mother's Name</th>
                                <th>Mobile</th>
                                <th>Roll No.</th>
                                <th>Class</th>
                                <th>Gender</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map((student) => (
                                <tr key={student._id}>
                                    <td>{student.name}</td>
                                    <td>{student.Fname}</td>
                                    <td>{student.Mname}</td>
                                    <td>{student.mobile}</td>
                                    <td>{student.rollNum}</td>
                                    <td>{student.sclassName}</td>
                                    <td>{student.gender}</td>
                                    <td className="action-buttons">
                                        <button className="view-btn" onClick={() => setViewStudent(student)}>View</button>
                                        <button className="edit-btn" onClick={() => handleUpdateClick(student)}>Edit</button>
                                        <button className="delete-btn" onClick={() => handleDelete(student._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {viewStudent && (
                        <div className="modal">
                            <div className="modal-content">
                                <span className="close-btn" onClick={() => setViewStudent(null)}>&times;</span>
                                <h2>Student Details</h2>
                                <p><strong>Name:</strong> {viewStudent.name}</p>
                                <p><strong>Father's Name:</strong> {viewStudent.Fname}</p>
                                <p><strong>Mother's Name:</strong> {viewStudent.Mname}</p>
                                <p><strong>Mobile:</strong> {viewStudent.mobile}</p>
                                <p><strong>Roll Number:</strong> {viewStudent.rollNum}</p>
                                <p><strong>Class:</strong> {viewStudent.sclassName}</p>
                                <p><strong>Gender:</strong> {viewStudent.gender}</p>
                            </div>
                        </div>
                    )}

                    {selectedStudent && (
                        <div className="update-form">
                            <h3>Update Student</h3>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const formData = new FormData(e.target);
                                    const updatedStudent = {
                                        _id: selectedStudent._id,
                                        name: formData.get('name'),
                                        Fname: formData.get('Fname'),
                                        Mname: formData.get('Mname'),
                                        mobile: formData.get('mobile'),
                                        rollNum: formData.get('rollNum'),
                                        sclassName: formData.get('sclassName'),
                                        gender: formData.get('gender'),
                                    };
                                    handleUpdateSubmit(updatedStudent);
                                }}
                            >
                                <label>
                                    Name:
                                    <input type="text" name="name" defaultValue={selectedStudent.name} required />
                                </label>
                                <label>
                                    Father's Name:
                                    <input type="text" name="Fname" defaultValue={selectedStudent.Fname} />
                                </label>
                                <label>
                                    Mother's Name:
                                    <input type="text" name="Mname" defaultValue={selectedStudent.Mname} />
                                </label>
                                <label>
                                    Mobile:
                                    <input type="text" name="mobile" defaultValue={selectedStudent.mobile} />
                                </label>
                                <label>
                                    Roll Number:
                                    <input type="text" name="rollNum" defaultValue={selectedStudent.rollNum} required />
                                </label>
                                <label>
                                    Class:
                                    <input type="text" name="sclassName" defaultValue={selectedStudent.sclassName} required />
                                </label>
                                <label>
                                    Gender:
                                    <input type="text" name="gender" defaultValue={selectedStudent.gender} />
                                </label>
                                <button type="submit">Save</button>
                                <button type="button" onClick={() => setSelectedStudent(null)}>Cancel</button>
                            </form>
                        </div>
                    )}
                </div>
                <StudentForm />
            </div>
        </div>
    );
};

export default StudentPage;
