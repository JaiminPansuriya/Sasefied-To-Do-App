require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI; // Access environment variable

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));


// Routes
app.use('/api/tasks', taskRoutes);


// Server
const PORT = process.env.PORT || 5000; // Use PORT from .env or fallback to 5000
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
