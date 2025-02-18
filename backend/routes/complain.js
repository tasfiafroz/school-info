const express = require('express');
const {
    createComplaint,
    getComplaints,
    getComplaint,
    updateComplaint,
    deleteComplaint
} = require('../controllers/ComplainController');

const router = express.Router();

// Get all complaints
router.get('/', getComplaints);

// Get a single complaint
router.get('/:id', getComplaint);

// POST a new complaint
router.post('/', createComplaint);

// DELETE a complaint
router.delete('/:id', deleteComplaint);

// UPDATE a complaint
router.patch('/:id', updateComplaint);

module.exports = router;
