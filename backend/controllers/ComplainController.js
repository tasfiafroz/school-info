const Complain = require('../models/complainSchema');
const mongoose = require('mongoose');

// Get all complaints
const getComplaints = async (req, res) => {
    try {
        const complaints = await Complain.find({}).sort({ date: -1 });
        res.status(200).json(complaints);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch complaints' });
    }
};

// Get a single complaint
const getComplaint = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such complaint" });
    }

    try {
        const complaint = await Complain.findById(id);
        if (!complaint) {
            return res.status(404).json({ error: 'No such complaint' });
        }
        res.status(200).json(complaint);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching complaint' });
    }
};

// Create a new complaint
const createComplaint = async (req, res) => {
    const { Name, date, complaint } = req.body;

    if (!date || !complaint) {
        return res.status(400).json({ error: "Date and complaint fields are required" });
    }

    try {
        const newComplaint = await Complain.create({ Name, date, complaint });
        res.status(201).json(newComplaint);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a complaint
const deleteComplaint = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such complaint" });
    }

    try {
        const complaint = await Complain.findByIdAndDelete(id);
        if (!complaint) {
            return res.status(404).json({ error: 'No such complaint' });
        }
        res.status(200).json(complaint);
    } catch (error) {
        res.status(500).json({ error: 'Error deleting complaint' });
    }
};

// Update a complaint
const updateComplaint = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such complaint" });
    }

    try {
        const complaint = await Complain.findByIdAndUpdate(id, req.body, { new: true });
        if (!complaint) {
            return res.status(404).json({ error: 'No such complaint' });
        }
        res.status(200).json(complaint);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getComplaints,
    getComplaint,
    createComplaint,
    deleteComplaint,
    updateComplaint
};
