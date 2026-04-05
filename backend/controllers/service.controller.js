const Service = require('../models/service.model');
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
        const { query } = req.query;

        // ❗ if no query → return all (fallback)
        if (!query) {
            const services = await Service.find()
                .limit(20)
                .populate('provider', 'name phonePrimary');

            return res.json({ count: services.length, services });
        }

        const services = await Service.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },     // name search
                { address: { $regex: query, $options: 'i' } }   // location search
            ]
        })
        .populate('provider', 'name phonePrimary')
        .limit(20);

        res.json({
            count: services.length,
            services
        });

    } catch (err) {
        console.log(err);
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
        const {
            title,
            description,
            pricePerMonth,
            mealType,
            address,
            lng,
            lat
        } = req.body;

        // 🔥 upload image to cloudinary
        const result = await cloudinary.uploader.upload_stream(
            { folder: "tiffin-services" },
            async (error, result) => {
                if (error) throw error;

                const service = await Service.create({
                    provider: req.user.userId,
                    title,
                    description,
                    pricePerMonth,
                    mealType,
                    address,
                    image: result.secure_url, // ✅ store URL
                    location: {
                        type: "Point",
                        coordinates: [lng, lat]
                    }
                });

                res.status(201).json(service);
            }
        );

        result.end(req.file.buffer);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
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