const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    Fname: {
        type: String,
    },
    Mname: {
        type: String,
    },
    mobile: {
        type: Number,
    },
    rollNum: {
        type: Number,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    sclassName: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "Student"
    },
    gender: {
        type: String,
    },
    examResult: [
        {
            examName: {
                type: String,
            },
            subName: {
                type: String,
            },
            marksObtained: {
                type: Number,
                default: 0
            }
        }
    ],
    evaluation: [ 
        {
            feedback: {
                type: String
            },
            teacherName: {
                type: String,
               
            }
        }
    ],
    attendance: [{
        date: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            enum: ['Present', 'Absent'],
            required: true
        },
        subName: {
            type: String,
            required: true
        }
    }]
});

module.exports = mongoose.model("student", studentSchema);