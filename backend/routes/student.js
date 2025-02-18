const express = require('express')
const Student = require('../models/studentSchema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    createStudent,
    getStudents,
    getStudent,
    updateStudent,
    deleteStudent,
    getStudentCount
} = require('../controllers/StudentController')

const router = express.Router()

//get all students
router.get('/', getStudents)

//get a single student
router.get('/profile/:rollNum', getStudent)

//POST a new student
router.post('/', createStudent)

//DELETE a student
router.delete('/:id', deleteStudent)

//UPDATE a student
router.patch('/:id', updateStudent)

//result input code
router.post("/exam-result", async (req, res) => {
    const { rollNum, examName, subName, marksObtained } = req.body;

    try {
        const student = await Student.findOneAndUpdate(
            { rollNum },
            { $push: { examResult: { examName, subName, marksObtained } } },
            { new: true, runValidators: false } // Prevents revalidating required fields
        );

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json({ message: "Exam result added successfully", student });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

//GET exam result
router.get("/exam-result/:rollNum", async (req, res) => {
    const { rollNum } = req.params;

    try {
        const student = await Student.findOne({ rollNum });

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json({ examResult: student.examResult });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});



// Student Login Route
router.post('/login', async (req, res) => {
    const { rollNum, password } = req.body;

    if (!rollNum || !password) {
        return res.status(400).json({ message: 'Roll Number and Password are required' });
    }

    try {
        const student = await Student.findOne({ rollNum });

        if (!student) {
            return res.status(400).json({ message: 'Student not found' });
        }

        const isMatch = await bcrypt.compare(password, student.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: student._id, role: student.role }, 'your_secret_key', { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});



// Get all evaluations of a specific student
router.get('/:rollNum/evaluations', async (req, res) => {
    const { rollNum } = req.params;

    try {
        const student = await Student.findOne({ rollNum });

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        // Ensure evaluations array exists
        if (!student.evaluation) {
            student.evaluation = [];
            await student.save();
        }

        res.status(200).json(student.evaluation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add a new evaluation to a specific student
router.post('/:rollNum/evaluations', async (req, res) => {
    const { rollNum } = req.params;
    const { feedback, teacherName } = req.body;

    if (!feedback || !teacherName) {
        return res.status(400).json({ error: 'Both feedback and teacherName are required' });
    }

    try {
        const student = await Student.findOne({ rollNum });

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        // Ensure evaluations array exists
        if (!student.evaluation) {
            student.evaluation = [];
        }

        // Add new evaluation
        student.evaluation.push({ feedback, teacherName });

        await student.save();

        res.status(201).json(student.evaluation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update all evaluations of a specific student
router.patch('/:rollNum/evaluations', async (req, res) => {
    const { rollNum } = req.params;
    const { evaluations } = req.body; // Expect an array of evaluations

    if (!evaluations || !Array.isArray(evaluations)) {
        return res.status(400).json({ error: 'Evaluations array is required' });
    }

    try {
        const student = await Student.findOne({ rollNum });

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        // Replace all evaluations
        student.evaluation = evaluations;

        await student.save();

        res.status(200).json(student.evaluation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete all evaluations of a student
router.delete('/:rollNum/evaluations', async (req, res) => {
    const { rollNum } = req.params;

    try {
        const student = await Student.findOne({ rollNum });

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        // Clear all evaluations
        student.evaluation = [];

        await student.save();

        res.status(200).json({ message: 'All evaluations deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router
