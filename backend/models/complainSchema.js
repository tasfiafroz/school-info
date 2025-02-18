const mongoose = require('mongoose');

const complainSchema = new mongoose.Schema({
    Name: {
        type: String,
    },
    date: {
        type: Date,
        required: true
    },
    complaint: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("complain", complainSchema);