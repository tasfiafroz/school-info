import { useState } from "react";
import './form.css';

const NoticeForm = () => {
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [date, setDate] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const notice = { title, details, date };

        const response = await fetch('http://localhost:5000/api/notice', {
            method: 'POST',
            body: JSON.stringify(notice),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        }
        if (response.ok) {
            setTitle('');
            setDetails('');
            setDate('');
            setError(null);
            console.log('New notice added', json);
        }
    };

    return (
        <form className="notice-form" onSubmit={handleSubmit}>
            <h3>Add a new notice</h3>

            <label>Title</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                required
            />

            <label>Details</label>
            <textarea
                onChange={(e) => setDetails(e.target.value)}
                value={details}
                required
            />

            <label>Date</label>
            <input
                type="date"
                onChange={(e) => setDate(e.target.value)}
                value={date}
                required
            />

            <button type="submit">Add Notice</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default NoticeForm;
