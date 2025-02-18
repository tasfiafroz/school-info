// const Teacher = require('../models/teacherSchema')
// const mongoose = require('mongoose')

// //get all teachers
// const getTeachers = async (req, res) => {
//     const teachers = await Teacher.find({}).sort({createdAt: -1})
//     res.status(200).json(teachers)
// }

// //get a single teacher
// const getTeacher = async (req, res) => {
//     const {id} = req.params

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({error: "No such teacher"})
//     }

//     const teacher = await Teacher.findById(id)
    
//     if (!teacher) {
//         return res.status(404).json({error: 'No such teacher'})
//     }

//     res.status(200).json(teacher)
// }

// //create new teacher
// const createTeacher = async (req, res) => {
//     const {name, email, password, role, teachSubject, teachSclass, attendance} = req.body

//     try {
//         const teacher = await Teacher.create({name, email, password, role, teachSubject, teachSclass, attendance})
//         res.status(200).json(teacher)
//     } catch(error) {
//         res.status(400).json({error: error.message})
//     }
// }

// //delete a teacher
// const deleteTeacher = async (req, res) => {
//     const { id } = req.params;

//     // Check if the ID is valid
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({ error: 'No such teacher' });
//     }

//     try {
//         // Find and delete the teacher
//         const teacher = await Teacher.findOneAndDelete({ _id: id });

//         // If no teacher is found, return an error
//         if (!teacher) {
//             return res.status(404).json({ error: 'No such teacher' });
//         }

//         // Return the deleted teacher
//         res.status(200).json(teacher);
//     } catch (error) {
//         // Handle any errors
//         res.status(500).json({ error: error.message });
//     }
// };

// //update a teacher
// const updateTeacher = async (req, res) => {
//     const { id } = req.params;

//     // Check if the ID is valid
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({ error: 'No such teacher' });
//     }

//     try {
//         // Find and update the teacher
//         const teacher = await Teacher.findOneAndUpdate(
//             { _id: id },
//             { ...req.body },
//             { new: true } // Return the updated document
//         );

//         // If no teacher is found, return an error
//         if (!teacher) {
//             return res.status(404).json({ error: 'No such teacher' });
//         }

//         // Return the updated teacher
//         res.status(200).json(teacher);
//     } catch (error) {
//         // Handle any errors
//         res.status(500).json({ error: error.message });
//     }
// };

// module.exports = {
//     getTeachers,
//     getTeacher,
//     createTeacher,
//     deleteTeacher,
//     updateTeacher
// }

const Teacher = require('../models/teacherSchema');
const mongoose = require('mongoose');

// Get all teachers
const getTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find({}).sort({ createdAt: -1 });
        res.status(200).json(teachers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single teacher
const getTeacher = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such teacher" });
    }

    try {
        const teacher = await Teacher.findById(id);
        if (!teacher) {
            return res.status(404).json({ error: "No such teacher" });
        }
        res.status(200).json(teacher);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new teacher
const createTeacher = async (req, res) => {
    const { name, email, password, teachSubject, dob, JoinDate, mobile, address } = req.body;

    try {
        const teacher = await Teacher.create({
            name,
            email,
            password,
            teachSubject,
            dob,
            JoinDate,
            mobile,
            address
        });
        res.status(201).json(teacher);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a teacher
const deleteTeacher = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such teacher" });
    }

    try {
        const teacher = await Teacher.findOneAndDelete({ _id: id });
        if (!teacher) {
            return res.status(404).json({ error: "No such teacher" });
        }
        res.status(200).json(teacher);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a teacher
const updateTeacher = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such teacher" });
    }

    try {
        const teacher = await Teacher.findOneAndUpdate(
            { _id: id },
            { ...req.body },
            { new: true } // Return the updated document
        );

        if (!teacher) {
            return res.status(404).json({ error: "No such teacher" });
        }

        res.status(200).json(teacher);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getTeachers,
    getTeacher,
    createTeacher,
    deleteTeacher,
    updateTeacher
};
