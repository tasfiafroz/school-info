import { useState } from "react";
import './form.css';

const ComplainForm = () => {
    const [name, setName] = useState('');
    const [complaint, setComplaint] = useState('');
    const [date, setDate] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const complain = { Name: name, complaint, date };

        const response = await fetch('http://localhost:5000/api/complain', {
            method: 'POST',
            body: JSON.stringify(complain),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        }
        if (response.ok) {
            setName('');
            setComplaint('');
            setDate('');
            setError(null);
            console.log('New complaint added', json);
        }
    };

    return (
        <div className="complain">
            <form className="complain-form" onSubmit={handleSubmit}>
                <h3>Submit a New Complaint</h3>

                <label>Name</label>
                <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                />

                <label>Complaint</label>
                <textarea
                    onChange={(e) => setComplaint(e.target.value)}
                    value={complaint}
                    required
                />

                <label>Date</label>
                <input
                    type="date"
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                    required
                />

                <button type="submit">Submit Complaint</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
};

export default ComplainForm;
