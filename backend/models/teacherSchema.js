const mongoose = require("mongoose")

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "Teacher"
    },
    teachSubject: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
    },
    JoinDate: {
        type: Date,
    },
    mobile: {
        type: Number,
    },
    address: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model("teacher", teacherSchema)