const Student = require('../models/studentSchema');
const mongoose = require('mongoose');

// Get all students
const getStudents = async (req, res) => {
    try {
        const students = await Student.find({}).sort({ createdAt: -1 });
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single student by roll number
const getStudent = async (req, res) => {
    const { rollNum } = req.params;

    try {
        const student = await Student.findOne({ rollNum });
        if (!student) {
            return res.status(404).json({ error: 'No such student' });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new student
const createStudent = async (req, res) => {
    const { name, Fname, Mname, mobile, rollNum, password, sclassName, gender } = req.body;

    try {
        const student = await Student.create({
            name,
            Fname,
            Mname,
            mobile,
            rollNum,
            password,
            sclassName,
            gender
        });
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a student
const deleteStudent = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such student' });
    }

    try {
        const student = await Student.findOneAndDelete({ _id: id });
        if (!student) {
            return res.status(404).json({ error: 'No such student' });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update student details
const updateStudent = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such student' });
    }

    try {
        const student = await Student.findOneAndUpdate(
            { _id: id },
            { ...req.body },
            { new: true } // Return the updated document
        );

        if (!student) {
            return res.status(404).json({ error: 'No such student' });
        }

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getStudents,
    getStudent,
    createStudent,
    deleteStudent,
    updateStudent,
};
