import { useState } from "react";

const ClassForm = () => {
    const [sclassName, setSclassName] = useState('');
    const [seatCapacity, setSeatCapacity] = useState('');
    const [section, setSection] = useState('');
    const [roomNum, setRoomNum] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const sclass = { sclassName, seatCapacity, section, roomNum };

        const response = await fetch('http://localhost:5000/api/sclass', {
            method: 'POST',
            body: JSON.stringify(sclass),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        } else {
            setSclassName('');
            setSeatCapacity('');
            setSection('');
            setRoomNum('');
            setError(null);
            console.log('New class added');
        }
    };

    return (
        <form className="class-form" onSubmit={handleSubmit}>
            <h3>Add a New Class</h3>

            <label>Class Name</label>
            <input type="text" onChange={(e) => setSclassName(e.target.value)} value={sclassName} required />

            <label>Seat Capacity</label>
            <input type="number" onChange={(e) => setSeatCapacity(e.target.value)} value={seatCapacity} required />

            <label>Section</label>
            <input type="text" onChange={(e) => setSection(e.target.value)} value={section} required />

            <label>Room Number</label>
            <input type="number" onChange={(e) => setRoomNum(e.target.value)} value={roomNum} required />

            <button type="submit">Add Class</button>

            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
    );
};

export default ClassForm;
