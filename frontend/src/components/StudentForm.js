import { useState } from "react";
import bcrypt from 'bcryptjs';
import './form.css';

const StudentForm = () => {
    const [name, setName] = useState('');
    const [Fname, setFname] = useState('');
    const [Mname, setMname] = useState('');
    const [mobile, setMobile] = useState('');
    const [rollNum, setRollNum] = useState('');
    const [password, setPassword] = useState('');
    const [sclassName, setSclassName] = useState('');
    const [gender, setGender] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Hash the password before sending it
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const student = { 
            name, 
            Fname, 
            Mname, 
            mobile, 
            rollNum, 
            password: hashedPassword, 
            sclassName, 
            gender 
        };

        const response = await fetch('http://localhost:5000/api/student', {
            method: 'POST',
            body: JSON.stringify(student),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        } else {
            // Reset form fields
            setName('');
            setFname('');
            setMname('');
            setMobile('');
            setRollNum('');
            setPassword('');
            setSclassName('');
            setGender('');
            setError(null);
            console.log('New student added', json);
        }
    };

    return (
        <form className="student-form" onSubmit={handleSubmit}>
            <h3>Add a new student</h3>

            <label>Student Name</label>
            <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
            />

            <label>Father's Name</label>
            <input
                type="text"
                onChange={(e) => setFname(e.target.value)}
                value={Fname}
            />

            <label>Mother's Name</label>
            <input
                type="text"
                onChange={(e) => setMname(e.target.value)}
                value={Mname}
            />

            <label>Mobile</label>
            <input
                type="number"
                onChange={(e) => setMobile(e.target.value)}
                value={mobile}
            />

            <label>Roll Number</label>
            <input
                type="number"
                onChange={(e) => setRollNum(e.target.value)}
                value={rollNum}
                required
            />

            <label>Password</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
            />

            <label>Class Name (ID)</label>
            <input
                type="text"
                onChange={(e) => setSclassName(e.target.value)}
                value={sclassName}
                required
            />

            <label>Gender</label>
            <select onChange={(e) => setGender(e.target.value)} value={gender}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>

            <button type="submit">Add Student</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default StudentForm;
