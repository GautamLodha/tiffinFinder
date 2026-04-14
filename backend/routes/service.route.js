const express = require('express');
const router = express.Router();

const {getNearbyServices,searchServices,getServiceById,createService,getServicesByProvider,getMyServices,deleteService,updateService } = require('../controllers/service.controller');
const { protect, authorizeRoles } = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware.js')
router.get('/user', getNearbyServices);

router.get('/user/search', searchServices);

router.get('/user/service/:id', getServiceById);

router.get('/user/provider/:providerId',getServicesByProvider)

router.post('/provider/service',protect,authorizeRoles('provider'),upload.single('image'),createService)

router.get('/provider/services',protect,authorizeRoles('provider'),getMyServices);

router.delete('/provider/service/:id',protect,authorizeRoles('provider'),deleteService);

router.put('/provider/service/:id',protect,authorizeRoles('provider'),updateService);

module.exports = router;