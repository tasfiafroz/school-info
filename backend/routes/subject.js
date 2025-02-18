const express = require('express')
const {
    createSubject,
    getSubjects,
    getSubject,
    updateSubject,
    deleteSubject
} = require('../controllers/SubjectController')

const router = express.Router()

//get all subjects
router.get('/', getSubjects)

//get a single subject
router.get('/:id', getSubject)

//POST a new subject
router.post('/', createSubject)

//DELETE a subject
router.delete('/:id', deleteSubject)

//UPDATE a subject
router.patch('/:id', updateSubject)

module.exports = router
