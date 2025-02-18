import React from 'react';

const ClassDetails = ({ classDetail, onDelete, onUpdate }) => {
    const styles = {
        classDetails: {
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            marginBottom: '20px',
            maxWidth: '350px',
            marginLeft: '300px',
        },
        heading: {
            margin: '0',
            fontSize: '1.5em',
            color: '#333',
            textAlign: 'center',
        },
        details: {
            textAlign: 'center',
            fontSize: '1em',
            color: '#555',
        },
        buttonContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '10px',
        },
        button: {
            padding: '5px 10px',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer',
            backgroundColor: '#007bff',
            color: '#fff',
        },
        deleteButton: {
            backgroundColor: '#dc3545',
        },
    };

    return (
        <div className="class-details" style={styles.classDetails}>
            <h4 style={styles.heading}>{classDetail.sclassName}</h4>
            <p style={styles.details}>Seat Capacity: {classDetail.seatCapacity}</p>
            <p style={styles.details}>Section: {classDetail.section}</p>
            <p style={styles.details}>Room Number: {classDetail.roomNum}</p>

            <div style={styles.buttonContainer}>
                <button style={styles.button} onClick={onUpdate}>Update</button>
                <button style={{ ...styles.button, ...styles.deleteButton }} onClick={onDelete}>Delete</button>
            </div>
        </div>
    );
};

export default ClassDetails;
