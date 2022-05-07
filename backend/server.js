const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;


// connect to database
connectDB();


// Initialize express
const app = express();


// Body parser
app.use(express.json({limit: '2mb'}));
app.use(express.urlencoded({ limit: '2mb', extended: false }));


// Router
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/profiles', require('./routes/profileRoutes'));
app.use('/api/page', require('./routes/pageRoutes'));
app.use('/api/questions', require('./routes/questionRoutes'));


// server connection
app.listen(port, () => {
    console.log(`Server is runnig on port ${port}`);
});