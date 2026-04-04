const express = require('express');
const app = express();

// middleware
app.use(express.json());

// routes
const authRoutes = require('../routes/auth.route.js');
const serviceRoutes = require('../routes/service.route.js')
const reviewRoutes = require('../routes/review.route.js')

// base routes
app.use('/api/auth', authRoutes);
app.use('/api', serviceRoutes);
// app.user('/api/review',)
app.use('/api/review',reviewRoutes)

// test route
app.get('/', (req, res) => {
    res.send('API is running...');
});

module.exports = app;