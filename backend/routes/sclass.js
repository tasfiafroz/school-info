const express = require('express')
const {
    createSclass,
    getSclasses,
    getSclass,
    updateSclass,
    deleteSclass
} = require('../controllers/ClassController')

const router = express.Router()

//get all sclasses
router.get('/', getSclasses)

//get a single sclass
router.get('/:id', getSclass)

//POST a new sclass
router.post('/', createSclass)

//DELETE a sclass
router.delete('/:id', deleteSclass)

//UPDATE a sclass
router.patch('/:id', updateSclass)

module.exports = router
