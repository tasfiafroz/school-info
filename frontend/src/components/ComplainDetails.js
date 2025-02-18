import React from 'react';

const ComplainDetails = ({ complain, onDelete, onUpdate }) => {
    const formattedDate = new Date(complain.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="complain-details">
            <p><strong>Name:</strong> {complain.Name}</p>
            <p><strong>Complaint:</strong> {complain.complaint}</p>
            <p><strong>Date:</strong> {formattedDate}</p>
            <button onClick={() => onUpdate(complain)}>Update</button>
            <button onClick={() => onDelete(complain._id)}>Delete</button>
        </div>
    );
};

export default ComplainDetails;
