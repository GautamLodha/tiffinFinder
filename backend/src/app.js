const express = require('express');
const app = express();

// middleware
app.use(express.json());

// routes
const authRoutes = require('../routes/auth.route.js');
const serviceRoutes = require('../routes/service.route.js')

// base routes
app.use('/api/auth', authRoutes);
app.use('/api', serviceRoutes);

// test route
app.get('/', (req, res) => {
    res.send('API is running...');
});

module.exports = app;