import React, { useEffect, useState } from 'react';
import NoticeForm from '../../components/NoticeForm';
import NoticeDetails from '../../components/NoticeDetails';
import Sidebar from '../../components/AdminNav';
import './style.css';

const NoticePage = () => {
    const [notices, setNotices] = useState([]);
    const [selectedNotice, setSelectedNotice] = useState(null); // For update functionality

    // Fetch all notices
    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/notice');
                const json = await response.json();

                if (response.ok) {
                    setNotices(json);
                } else {
                    console.error('Failed to fetch notice details:', json);
                }
            } catch (error) {
                console.error('Error fetching notice details:', error);
            }
        };

        fetchNotices();
    }, []);

    // Handle delete notice
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/notice/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Remove the deleted notice from the state
                setNotices(notices.filter((notice) => notice._id !== id));
            } else {
                console.error('Failed to delete notice');
            }
        } catch (error) {
            console.error('Error deleting notice:', error);
        }
    };

    // Handle update notice
    const handleUpdate = async (id, updatedData) => {
        try {
            const response = await fetch(`http://localhost:5000/api/notice/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (response.ok) {
                const updatedNotice = await response.json();
                // Update the notice in the state
                setNotices(notices.map((notice) =>
                    notice._id === id ? updatedNotice : notice
                ));
                setSelectedNotice(null); // Close the update form
            } else {
                console.error('Failed to update notice:', await response.json());
            }
        } catch (error) {
            console.error('Error updating notice:', error);
        }
    };

    return (
        <div>
            <Sidebar />
            <div>
                <h2 className='notice-h2'>Notices</h2>
                <div className='notice'>
                    {notices.map((notice) => (
                        <NoticeDetails
                            key={notice._id}
                            notice={notice}
                            onDelete={() => handleDelete(notice._id)}
                            onUpdate={() => setSelectedNotice(notice)} // Pass the notice to update
                        />
                    ))}
                </div>

                {/* Update Form */}
                {selectedNotice && (
                    <div className="update-formN">
                        <h3>Update Notice</h3>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.target);
                                const updatedData = {
                                    title: formData.get('title'),
                                    details: formData.get('details'),
                                    date: formData.get('date'),
                                };
                                handleUpdate(selectedNotice._id, updatedData);
                            }}
                        >
                            <label>
                                Title:
                                <input
                                    type="text"
                                    name="title"
                                    defaultValue={selectedNotice.title}
                                    required
                                />
                            </label>
                            <label>
                                Details:
                                <textarea
                                    name="details"
                                    defaultValue={selectedNotice.details}
                                    required
                                />
                            </label>
                            <label>
                                Date:
                                <input
                                    type="date"
                                    name="date"
                                    defaultValue={new Date(selectedNotice.date).toISOString().split('T')[0]}
                                    required
                                />
                            </label>
                            <button type="submit">Save</button>
                            <button type="button" onClick={() => setSelectedNotice(null)}>
                                Cancel
                            </button>
                        </form>
                    </div>
                )}

                <NoticeForm />
            </div>
        </div>
    );
};

export default NoticePage;