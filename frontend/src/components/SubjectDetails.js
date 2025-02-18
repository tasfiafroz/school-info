import React from 'react';

const SubjectDetails = ({ subject, onDelete, onUpdate }) => {
    return (
        <div className="subject-details">
            <p>Subject Name: {subject.subName}</p>
            <p>Subject Code: {subject.subCode}</p>
            <p>Class: {subject.sclassName}</p>
            <p>Subject Teacher: {subject.teacher}</p>
            <button onClick={onUpdate}>Update</button>
            <button onClick={onDelete}>Delete</button>
        </div>
    );
};

export default SubjectDetails;