import React from 'react';

const NoticeDetailsV = ({ notice }) => {
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
        </div>
    );
};

export default NoticeDetailsV;