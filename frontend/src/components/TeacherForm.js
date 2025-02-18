import { useState } from "react";
import bcrypt from 'bcryptjs';
import './form.css';

const TeacherForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [teachSubject, setTeachSubject] = useState('');
    const [dob, setDob] = useState('');
    const [JoinDate, setJoinDate] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Hash the password before sending it
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const teacher = { 
            name, 
            email, 
            password: hashedPassword, 
            teachSubject, 
            dob, 
            JoinDate, 
            mobile, 
            address 
        };

        const response = await fetch('http://localhost:5000/api/teacher', {
            method: 'POST',
            body: JSON.stringify(teacher),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        } else {
            setName('');
            setEmail('');
            setPassword('');
            setTeachSubject('');
            setDob('');
            setJoinDate('');
            setMobile('');
            setAddress('');
            setError(null);
            console.log('New teacher added', json);
        }
    };

    return (
        <form className="teacher-form" onSubmit={handleSubmit}>
            <h3>Add a new teacher</h3>

            <label>Teacher Name</label>
            <input type="text" onChange={(e) => setName(e.target.value)} value={name} required />

            <label>Email</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} required />

            <label>Password</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} required />

            <label>Teaching Subject</label>
            <input type="text" onChange={(e) => setTeachSubject(e.target.value)} value={teachSubject} required />

            <label>Date of Birth</label>
            <input type="date" onChange={(e) => setDob(e.target.value)} value={dob} />

            <label>Join Date</label>
            <input type="date" onChange={(e) => setJoinDate(e.target.value)} value={JoinDate} />

            <label>Mobile Number</label>
            <input type="tel" onChange={(e) => setMobile(e.target.value)} value={mobile} />

            <label>Address</label>
            <input type="text" onChange={(e) => setAddress(e.target.value)} value={address} />

            <button type="submit">Add Teacher</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default TeacherForm;
