const express = require('express');
const router = express.Router();

const {
    getNearbyServices,
    searchServices,
    getServiceById,
    createService
} = require('../controllers/service.controller');
const { protect, authorizeRoles } = require('../middleware/auth.middleware');
router.get('/user', getNearbyServices);

router.get('/user/search', searchServices);

router.get('/user/service/:id', getServiceById);

router.post('/provider/service',protect,authorizeRoles('provider'),createService)

module.exports = router;