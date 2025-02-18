import React from 'react';

const ComplainDetailsV = ({ complain }) => {
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
        </div>
    );
};

export default ComplainDetailsV;
