const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { globalErrorHandler } = require('./middlewares/errorHandler');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection 
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Successfully connected to MongoDB Atlas'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

const musicRoutes = require('./routes/musicRoutes');
const userRoutes = require('./routes/userRoutes'); 

app.use('/api/music', musicRoutes);
app.use('/api/users', userRoutes); // User routes endpoint prefix

// Root route 
app.get('/', (req, res) => {
    res.send('Vives Music API is running perfectly');
});

// Global error handler middleware
app.use(globalErrorHandler); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

