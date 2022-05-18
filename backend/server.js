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
app.use('/api/questions', require('./routes/questionRoutes'));

// development only
if (process.env.NODE_ENV === 'development') {
    app.use('/api/generate', require('./generate'));
}


// server connection
app.listen(port, () => {
    console.log(`Server is runnig on port ${port}`);
});