require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const studentRoutes = require('./routes/student')
const teacherRoutes = require('./routes/teacher')
const sclassRoutes = require('./routes/sclass')
const subjectRoutes = require('./routes/subject')
const noticeRoutes = require('./routes/notice')
const complainRoutes = require('./routes/complain')

// Initialize Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//routes
app.use('/api/student', studentRoutes) 
app.use('/api/teacher', teacherRoutes)
app.use('/api/sclass', sclassRoutes)
app.use('/api/subject', subjectRoutes)
app.use('/api/notice', noticeRoutes)
app.use('/api/complain', complainRoutes)

// Secret Key for JWT
const SECRET_KEY = 'jdakfhwieufcbakscj34235gfsdfgs';

// Admin 
const ADMIN = {
    email: 'admin@gmail.com',
    password: 'admin123',
};

// Admin Login Route
app.post('/api/admin/login', (req, res) => {
    const { email, password } = req.body;

    if (email === ADMIN.email && password === ADMIN.password) {
        const token = jwt.sign({ email, isAdmin: true }, SECRET_KEY, { expiresIn: '1h' });
        return res.json({ token });
    }

    res.status(401).json({ message: 'Invalid credentials' });
});

// Protected Admin Dashboard Route
app.get('/api/admin/dashboard', (req, res) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).json({ message: 'Access denied' });

    const token = authHeader.split(' ')[1]; // Extract token from "Bearer token"

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        if (decoded.isAdmin) return res.json({ message: 'Welcome, Admin!' });

        res.status(403).json({ message: 'Access forbidden' });
    } catch {
        res.status(400).json({ message: 'Invalid token' });
    }
});

// Logging Middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

//connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for request
        app.listen(process.env.PORT, () =>{
        console.log('connected to DB and listening on port ',process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })
