const Sclass = require('../models/sclassSchema');
const mongoose = require('mongoose');

// Get all classes
const getSclasses = async (req, res) => {
    const sclasses = await Sclass.find({}).sort({ createdAt: -1 });
    res.status(200).json(sclasses);
};

// Get a single class
const getSclass = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such class" });
    }

    const sclass = await Sclass.findById(id);

    if (!sclass) {
        return res.status(404).json({ error: "No such class" });
    }

    res.status(200).json(sclass);
};

// Create new class
const createSclass = async (req, res) => {
    const { sclassName, seatCapacity, section, roomNum } = req.body;

    // Check if all required fields are provided
    if (!sclassName || !seatCapacity || !section || !roomNum) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const sclass = await Sclass.create({ sclassName, seatCapacity, section, roomNum });
        res.status(201).json(sclass);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a class
const deleteSclass = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such class" });
    }

    const sclass = await Sclass.findOneAndDelete({ _id: id });

    if (!sclass) {
        return res.status(404).json({ error: "No such class" });
    }

    res.status(200).json(sclass);
};

// Update a class
const updateSclass = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such class" });
    }

    const sclass = await Sclass.findOneAndUpdate({ _id: id }, req.body, { new: true });

    if (!sclass) {
        return res.status(400).json({ error: "No such class" });
    }

    res.status(200).json(sclass);
};

module.exports = {
    getSclasses,
    getSclass,
    createSclass,
    deleteSclass,
    updateSclass
};
