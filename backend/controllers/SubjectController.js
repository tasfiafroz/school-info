const Subject = require('../models/subjectSchema')
const mongoose = require('mongoose')

//get all subjects
const getSubjects = async (req, res) => {
    const subjects = await Subject.find({}).sort({createdAt: -1})
    res.status(200).json(subjects)
}

//get a single subject
const getSubject = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such subject"})
    }

    const subject = await Subject.findById(id)
    
    if (!subject) {
        return res.status(404).json({error: 'No such subject'})
    }

    res.status(200).json(subject)
}

//create new subject
const createSubject = async (req, res) => {
    const {subName, subCode, sclassName, teacher} = req.body

    try {
        const subject = await Subject.create({subName, subCode, sclassName, teacher})
        res.status(200).json(subject)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

//delete a subject
const deleteSubject = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such subject"})
    }

    const subject = await Subject.findOneAndDelete({_id: id})

    if (!subject) {
        return res.status(404).json({error: 'No such subject'})
    }
    
    res.status(200).json(subject)
}

//update a subject
const updateSubject = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such subject"})
    }

    const subject = await Subject.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!subject) {
        return res.status(400).json({error: 'No such subject'})
    }

    res.status(200).json(subject)
}

module.exports = {
    getSubjects,
    getSubject,
    createSubject,
    deleteSubject,
    updateSubject
}
