const mongoose = require("mongoose");

const sclassSchema = new mongoose.Schema({
    sclassName: {
        type: String,
        required: true,
    },
    seatCapacity: {
        type: Number,
        required: true,
    },
    section: {
        type: String,
        required: true,
    },
    roomNum: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("sclass", sclassSchema);

