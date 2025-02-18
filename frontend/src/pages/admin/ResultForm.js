import { useState } from "react";
import axios from "axios";
import Sidebar from "../../components/AdminNav";

const ResultForm = () => {
    const [formData, setFormData] = useState({
        rollNum: "",
        examName: "",
        subName: "",
        marksObtained: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/student/exam-result", formData);
            alert(response.data.message);
            setFormData({ rollNum: "", examName: "", subName: "", marksObtained: "" }); // Reset input fields
        } catch (error) {
            alert("Error adding exam result");
            console.error(error);
        }
    };

    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            <div style={{ marginLeft: "300px", padding: "20px", width: "100%" }}>
                <h2>Add Exam Result</h2>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
                    <input type="number" name="rollNum" placeholder="Roll Number" value={formData.rollNum} onChange={handleChange} required />
                    <input type="text" name="examName" placeholder="Exam Name" value={formData.examName} onChange={handleChange} required />
                    <input type="text" name="subName" placeholder="Subject Name" value={formData.subName} onChange={handleChange} required />
                    <input type="number" name="marksObtained" placeholder="Marks Obtained" value={formData.marksObtained} onChange={handleChange} required />
                    <button type="submit" style={{ padding: "8px", cursor: "pointer", background: "#007bff", color: "white", border: "none" }}>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default ResultForm;
