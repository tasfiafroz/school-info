const express = require('express')
const Teacher = require('../models/teacherSchema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    createTeacher,
    getTeachers,
    getTeacher,
    updateTeacher,
    deleteTeacher
} = require('../controllers/TeacherController')

const router = express.Router()

//get all teachers
router.get('/', getTeachers)

//get a single teacher
router.get('/:id', getTeacher)

//POST a new teacher
router.post('/', createTeacher)

//DELETE a teacher
router.delete('/:id', deleteTeacher)

//UPDATE a teacher
router.patch('/:id', updateTeacher)

// Teacher Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and Password are required' });
    }

    try {
        const teacher = await Teacher.findOne({ email });

        if (!teacher) {
            return res.status(400).json({ message: 'teacher not found' });
        }

        const isMatch = await bcrypt.compare(password, teacher.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: teacher._id, role: teacher.role }, 'your_secret_key', { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router
