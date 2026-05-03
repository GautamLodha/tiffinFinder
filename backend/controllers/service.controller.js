const Service = require('../models/service.model');
const Review = require('../models/review.model')
const cloudinary = require('../src/config/cloudinary.js')
const streamifier = require('streamifier');
const mongoose = require('mongoose');
exports.getNearbyServices = async (req, res) => {
    try {
        const { lng, lat } = req.query;

        let services;

        // ✅ If location is provided → geo search
        if (lng && lat) {
            services = await Service.find({
                location: {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates: [parseFloat(lng), parseFloat(lat)]
                        },
                        $maxDistance: 20000 // 20 km
                    }
                }
            })
            .populate('provider', 'name phonePrimary')
            .limit(20);

        } else {
            // ❌ If no location → show all listings
            services = await Service.find()
                    .sort({ rating: -1 }) // ⭐ best first
                    .limit(20)
                    .populate('provider', 'name phonePrimary');
        }

        res.json({
            count: services.length,
            services
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};
exports.searchServices = async (req, res) => {
    try {
        const { query, category } = req.query; // Extract category (mealType) from query params
        let filter = {};

        if (query) {
            filter.$or = [
                { title: { $regex: query, $options: 'i' } },
                { address: { $regex: query, $options: 'i' } }
            ];
        }
        if (category && category !== 'all') {
            filter.mealType = category.toLowerCase();
        }

        const services = await Service.find(filter)
            .populate('provider', 'name phonePrimary phoneSecondary') // Included both phones as requested
            .limit(20);

        res.json({
            count: services.length,
            services
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};
exports.getServiceById = async (req, res) => {
    try {
        const { id } = req.params;

        // ❗ validate id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid service ID" });
        }

        const service = await Service.findById(id)
            .populate('provider', 'name phonePrimary email')
            .populate({
                path : 'reviews',
                populate : {
                    path : 'user',
                    select : 'name'
                }
            })

        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }

        res.json(service);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};
exports.addReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const { id  } = req.params; // Often passed in URL: /service/:serviceId/review
        const serviceId = id;

        // 1. Check if user already reviewed this service (Prevents 11000 Mongo error)
        const existingReview = await Review.findOne({ 
            user: req.user.userId, 
            service: serviceId 
        });

        if (existingReview) {
            return res.status(400).json({ message: "You have already reviewed this service" });
        }

        // 2. Create the Review
        const review = await Review.create({
            user: req.user.userId,
            service: serviceId, // Required by your schema
            rating: Number(rating),
            comment
        });

        // 3. Link to Service and Update Metadata
        const service = await Service.findById(serviceId);
        
        // Calculate new average rating
        const currentTotalRating = (service.rating || 0) * (service.totalReviews || 0);
        const newTotalReviews = (service.totalReviews || 0) + 1;
        const newAverageRating = (currentTotalRating + Number(rating)) / newTotalReviews;

        service.reviews.push(review._id);
        service.totalReviews = newTotalReviews;
        service.rating = newAverageRating;
        
        await service.save();

        // Populate user name before sending back to frontend
        const populatedReview = await review.populate('user', 'name');

        res.status(201).json(populatedReview);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};
exports.deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;

        const review = await Review.findById(reviewId);
        if (!review) return res.status(404).json({ message: "Review not found" });

        // Security check: Only the author can delete
        console.log(review.user,"->",req.user.userId);
        
        if (review.user.toString() !== req.user.userId) {
            return res.status(401).json({ message: "Unauthorized to delete this review" });
        }

        const serviceId = review.service;

        // 1. Remove the review
        await review.deleteOne();

        // 2. Update Service Stats
        const service = await Service.findById(serviceId).populate('reviews');
        
        const remainingReviews = service.reviews.filter(r => r.toString() !== reviewId);
        const newTotalReviews = remainingReviews.length;
        
        // Recalculate average from remaining reviews
        let newAverage = 0;
        if (newTotalReviews > 0) {
            // We need to fetch the actual ratings of remaining reviews to be accurate
            const reviewsData = await Review.find({ _id: { $in: remainingReviews } });
            const sum = reviewsData.reduce((acc, curr) => acc + curr.rating, 0);
            newAverage = sum / newTotalReviews;
        }

        service.reviews = remainingReviews;
        service.totalReviews = newTotalReviews;
        service.rating = newAverage;
        
        await service.save();

        res.status(200).json({ message: "Review deleted successfully" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.getServicesByProvider = async (req, res) => {
    try {
        const { providerId } = req.params;

        // ❗ validate id
        if (!mongoose.Types.ObjectId.isValid(providerId)) {
            return res.status(400).json({ message: "Invalid provider ID" });
        }

        const services = await Service.find({ provider: providerId })
            .populate('provider', 'name phonePrimary email');

        if (services.length === 0) {
            return res.status(404).json({ message: "No services found for this provider" });
        }

        res.json({
            count: services.length,
            services
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};
exports.createService = async (req, res) => {
    try {
        const { title, description, pricePerMonth, mealType, address, lng, lat } = req.body;

        // 1. Validation
        if (!req.file) return res.status(400).json({ message: "Image is required" });
        if (!lat || !lng) return res.status(400).json({ message: "Valid address selection is required" });

        // 2. Upload to Cloudinary using Promise + Stream
        const uploadToCloudinary = (buffer) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "tiffin-services" },
                    (error, result) => {
                        if (result) resolve(result.secure_url);
                        else reject(error);
                    }
                );
                streamifier.createReadStream(buffer).pipe(stream);
            });
        };

        const imageUrl = await uploadToCloudinary(req.file.buffer);

        // 3. Create Service in MongoDB
        const service = await Service.create({
            provider: req.user.userId,
            title,
            description,
            pricePerMonth: Number(pricePerMonth),
            mealType,
            address,
            image: imageUrl,
            location: {
                type: "Point",
                coordinates: [parseFloat(lng), parseFloat(lat)] // [Longitude, Latitude]
            }
        });

        res.status(201).json({
            success: true,
            data: service
        });

    } catch (err) {
        console.error("Error creating service:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.getMyServices = async (req, res) => {
    try {
        const services = await Service.find({
            provider: req.user.userId
        });

        res.json({
            count: services.length,
            services
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};
exports.deleteService = async (req, res) => {
    try {
        const { id } = req.params;

        const service = await Service.findById(id);

        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }

        // ❗ ensure owner
        if (service.provider.toString() !== req.user.userId) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await service.deleteOne();

        res.json({ message: "Service deleted" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};
exports.updateService = async (req, res) => {
    try {
        const { id } = req.params;

        let service = await Service.findById(id);

        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }

        if (service.provider.toString() !== req.user.userId) {
            return res.status(403).json({ message: "Not authorized" });
        }

        service = await Service.findByIdAndUpdate(id, req.body, {
            new: true
        });

        res.json(service);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};