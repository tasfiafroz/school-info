import { useState } from "react";
import './form.css'

const SubjectForm = () => {
    const [subName, setSubName] = useState('');
    const [subCode, setSubCode] = useState('');
    const [sclassName, setSclassName] = useState('');
    const [teacher, setTeacher] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const subject = { subName, subCode, sclassName, teacher };

        const response = await fetch('http://localhost:5000/api/subject', {
            method: 'POST',
            body: JSON.stringify(subject),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        }
        if (response.ok) {
            setSubName('');
            setSubCode('');
            setSclassName('');
            setTeacher('');
            setError(null);
            console.log('New subject added', json);
        }
    };

    return (
        <form className="subject-form" onSubmit={handleSubmit}>
            <h3>Add a new subject</h3>

            <label>Subject Name</label>
            <input
                type="text"
                onChange={(e) => setSubName(e.target.value)}
                value={subName}
                required
            />

            <label>Subject Code</label>
            <input
                type="text"
                onChange={(e) => setSubCode(e.target.value)}
                value={subCode}
                required
            />

            <label>Class Name (ID)</label>
            <input
                type="text"
                onChange={(e) => setSclassName(e.target.value)}
                value={sclassName}
                required
            />

            <label>Teacher</label>
            <input
                type="text"
                onChange={(e) => setTeacher(e.target.value)}
                value={teacher}
                required
            />

            <button type="submit">Add Subject</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default SubjectForm;
