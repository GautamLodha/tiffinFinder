const express = require('express');
const cors = require('cors'); // Import it here
const app = express();

// 1. CORS MUST BE FIRST
app.use(cors({
  origin: 'https://chef-stream.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// 2. Body Parser
app.use(express.json());

// 3. Your routes
const authRoutes = require('../routes/auth.route.js');
const serviceRoutes = require('../routes/service.route.js');
const reviewRoutes = require('../routes/review.route.js');

app.use('/api/auth', authRoutes);
app.use('/api', serviceRoutes);
app.use('/api/review', reviewRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

module.exports = app;