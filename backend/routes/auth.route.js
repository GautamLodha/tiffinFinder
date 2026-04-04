const express = require('express');
const router = express.Router();

const {
    signup,
    login
} = require('../controllers/auth.controllers.js');

// Signup (student or provider)
router.post('/signup', signup);

// Login
router.post('/login', login);

module.exports = router;