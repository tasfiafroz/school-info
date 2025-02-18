const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
    subName: {
        type: String,
        required: true,
    },
    subCode: {
        type: String,
        required: true,
    },
    sclassName: {
        type: String,
        required: true,
    },
    teacher: {
        type: String,
    }
}, { timestamps: true });

module.exports = mongoose.model("subject", subjectSchema);