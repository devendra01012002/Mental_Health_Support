const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
<<<<<<< HEAD
const cors = require('cors');


const app = express();

const server = http.createServer(app);
=======
const cors=require('cors');
>>>>>>> afd56850ec5683a1bd4198bd58928d6ad6291e74

// Import routes
const UserRoute = require('./routes/userRoutes');
const chatRoute = require('./routes/chatRoutes');


// Middleware for cors

app.use(cors({origin:"http://localhost:5173"}));
// Middleware for parsing JSON

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB

mongoose
  .connect("mongodb://127.0.0.1:27017/Mental_Health_Service")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));




const io = socketIo(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

const PORT = 5000;

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('sendMessage', (message) => {
        io.emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Use Routes

app.use(UserRoute)
// app.use(chatRoute);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));