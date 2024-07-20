const express = require('express');
const app= express();  
const mongoose = require('mongoose');
const cors=require('cors');

// Import routes
const UserRoute= require('./routes/userRoutes');


// Middleware for cors

app.use(cors({origin:"http://localhost:5173"}));
// Middleware for parsing JSON

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB

mongoose.connect('mongodb://localhost:27017/Mental_Health_Service')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB:', err));

// Use Routes

app.use(UserRoute)


// Listen Server port

app.listen(8000, (req,res) => {
    console.log('Server started on port 3000')
});