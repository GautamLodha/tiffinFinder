const express = require('express');
const router = express.Router();

const {getNearbyServices,searchServices,getServiceById,createService,getServicesByProvider,getMyServices,deleteService,updateService, deleteReview, addReview } = require('../controllers/service.controller');
const { protect, authorizeRoles } = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware.js')
router.get('/user',protect ,getNearbyServices);

router.get('/user/search', protect,searchServices);

router.get('/user/service/:id',protect ,getServiceById);

router.get('/user/provider/:providerId',protect,getServicesByProvider)

router.post('/provider/service',protect,authorizeRoles('provider'),upload.single('image'),createService)

router.get('/provider/services',protect,authorizeRoles('provider'),getMyServices);

router.delete('/provider/service/:id',protect,authorizeRoles('provider'),deleteService);
// routes.js
router.post('/user/service/:id/review',protect,addReview)
router.delete('/review/:reviewId', protect, deleteReview);


router.put('/provider/service/:id',protect,authorizeRoles('provider'),updateService);

module.exports = router;