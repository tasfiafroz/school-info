// import React from 'react';

// const TeacherDetails = ({ teacher, onDelete, onUpdate }) => {
//     return (
//         <table className="teacher-table">
//             <thead>
//                 <tr>
//                     <th>Name</th>
//                     <th>Email</th>
//                     <th>Subject</th>
//                     <th>Date of Birth</th>
//                     <th>Join Date</th>
//                     <th>Mobile</th>
//                     <th>Address</th>
//                     <th>Actions</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 <tr>
//                     <td>{teacher.name}</td>
//                     <td>{teacher.email}</td>
//                     <td>{teacher.teachSubject}</td>
//                     <td>{teacher.dob ? new Date(teacher.dob).toLocaleDateString() : 'N/A'}</td>
//                     <td>{teacher.JoinDate ? new Date(teacher.JoinDate).toLocaleDateString() : 'N/A'}</td>
//                     <td>{teacher.mobile || 'N/A'}</td>
//                     <td>{teacher.address || 'N/A'}</td>
//                     <td className="action-buttons">
//                         <button className="edit-btn" onClick={onUpdate}>Edit</button>
//                         <button className="details-btn">Details</button>
//                         <button className="delete-btn" onClick={onDelete}>Delete</button>
//                     </td>
//                 </tr>
//             </tbody>
//         </table>
//     );
// };

// export default TeacherDetails;

import React from 'react';

const TeacherDetails = ({ teachers, onDelete, onUpdate }) => {
    return (
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
                {teachers.map((teacher) => (
                    <tr key={teacher.id}>
                        <td>{teacher.name}</td>
                        <td>{teacher.email}</td>
                        <td>{teacher.teachSubject}</td>
                        <td>{teacher.dob ? new Date(teacher.dob).toLocaleDateString() : 'N/A'}</td>
                        <td>{teacher.JoinDate ? new Date(teacher.JoinDate).toLocaleDateString() : 'N/A'}</td>
                        <td>{teacher.mobile || 'N/A'}</td>
                        <td>{teacher.address || 'N/A'}</td>
                        <td className="action-buttons">
                            <button className="edit-btn" onClick={() => onUpdate(teacher.id)}>Edit</button>
                            <button className="details-btn">Details</button>
                            <button className="delete-btn" onClick={() => onDelete(teacher.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TeacherDetails;
