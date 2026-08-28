const express = require('express');
const cors = require('cors');
require('dotenv').config();

const tourRoutes = require('./routes/tourRoutes');
const photoRoutes = require('./routes/photoRoutes');
const authRoutes = require('./routes/authRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tours', tourRoutes);
app.use('/api/photos', photoRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
      res.json({ status: 'ok', message: 'Personal Travel API is running smoothly' });
});

// Error handling middleware
app.use((err, req, res, next) => {
      console.error('Unhandled server error:', err.stack);
      res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

app.listen(PORT, () => {
      console.log(`🚀 Travel API Server running on port ${PORT}`);
});
