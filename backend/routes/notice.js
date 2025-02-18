const express = require('express');
const {
    createNotice,
    getNotices,
    getNotice,
    updateNotice,
    deleteNotice
} = require('../controllers/NoticeController');

const router = express.Router();

// Get all notices
router.get('/', getNotices);

// Get a single notice
router.get('/:id', getNotice);

// POST a new notice
router.post('/', createNotice);

// DELETE a notice
router.delete('/:id', deleteNotice);

// UPDATE a notice
router.patch('/:id', updateNotice);

module.exports = router;
