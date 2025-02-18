import React from 'react';

const NoticeDetails = ({ notice, onDelete, onUpdate }) => {
    const formattedDate = new Date(notice.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="notice-details">
            <p><strong>Title:</strong> {notice.title}</p>
            <p>{notice.details}</p>
            <p><strong>Date:</strong> {formattedDate}</p>
            <button onClick={onUpdate}>Update</button>
            <button onClick={onDelete}>Delete</button>
        </div>
    );
};

export default NoticeDetails;