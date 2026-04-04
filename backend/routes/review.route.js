const express = require('express');
const router = express.Router();

const { createReview } = require('../controllers/review.controller');
const { protect, authorizeRoles } = require('../middleware/auth.middleware');

// ⭐ only students can review
router.post(
    '/user/review/:serviceId',
    protect,
    authorizeRoles('student'),
    createReview
);

module.exports = router;