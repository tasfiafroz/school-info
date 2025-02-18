import React from 'react';

const StudentDetails = ({ student, onDelete, onUpdate }) => {
    return (
        <div className="student-details">
            <p>Name: {student.name}</p>
            <p>Father's Name: {student.Fname}</p>
            <p>Mother's Name: {student.Mname}</p>
            <p>Mobile: {student.mobile}</p>
            <p>Roll: {student.rollNum}</p>
            <p>Class: {student.sclassName}</p>
            <p>Gender: {student.gender}</p>
            <button onClick={() => onUpdate(student)}>Update</button>
            <button onClick={() => onDelete(student._id)}>Delete</button>
        </div>
    );
};

export default StudentDetails;
