const Notice = require('../models/noticeSchema');
const mongoose = require('mongoose');

// Get all notices
const getNotices = async (req, res) => {
    const notices = await Notice.find({}).sort({ createdAt: -1 });
    res.status(200).json(notices);
};

// Get a single notice
const getNotice = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such notice" });
    }

    const notice = await Notice.findById(id);

    if (!notice) {
        return res.status(404).json({ error: 'No such notice' });
    }

    res.status(200).json(notice);
};

// Create a new notice
const createNotice = async (req, res) => {
    const { title, details, date } = req.body;

    try {
        const notice = await Notice.create({ title, details, date });
        res.status(200).json(notice);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a notice
const deleteNotice = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such notice" });
    }

    const notice = await Notice.findOneAndDelete({ _id: id });

    if (!notice) {
        return res.status(404).json({ error: 'No such notice' });
    }

    res.status(200).json(notice);
};

// Update a notice
const updateNotice = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such notice" });
    }

    const notice = await Notice.findOneAndUpdate({ _id: id }, {
        ...req.body
    });

    if (!notice) {
        return res.status(400).json({ error: 'No such notice' });
    }

    res.status(200).json(notice);
};

module.exports = {
    getNotices,
    getNotice,
    createNotice,
    deleteNotice,
    updateNotice
};
